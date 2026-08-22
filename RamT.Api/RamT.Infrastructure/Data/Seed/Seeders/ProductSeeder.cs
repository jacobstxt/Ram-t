using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using RamT.Application.Interfaces;
using RamT.Application.Models.SeedDTO;
using RamT.Domain.Entities;
using RamT.Infrastructure.Data;

namespace RamT.Infrastructure.Data.Seed;

public class ProductSeeder : ISeeder
{
    private readonly AppDbContext _context;
    private readonly IImageService _imageService;

    public ProductSeeder(AppDbContext context, IImageService imageService)
    {
        _context = context;
        _imageService = imageService;
    }

    public async Task SeedAsync()
    {
        if (await _context.Products.AnyAsync())
            return;

        var jsonPath = Path.Combine(
            AppContext.BaseDirectory,
            "Data", "Seed", "JsonSeedData", "Products.json");

        var json = await File.ReadAllTextAsync(jsonPath);

        var dtos = JsonSerializer.Deserialize<List<ProductSeedDTO>>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        }) ?? [];

        var products = dtos.Select(dto => new Product
        {
            Id = dto.Id,
            Name = dto.Name,
            ShortDescription = dto.ShortDescription,
            Description = dto.Description,
            Manufacturer = dto.Manufacturer,
            WarrantyYears = dto.WarrantyYears,
            Price = dto.Price,
            CategoryId = dto.CategoryId
        }).ToList();

        await _context.Products.AddRangeAsync(products);
        await _context.SaveChangesAsync();

        var images = new List<ProductImage>();
        foreach (var dto in dtos)
        {
            for (int i = 0; i < dto.Images.Count; i++)
            {
                var localName = await _imageService.SaveImageFromUrlAsync(dto.Images[i]);
                images.Add(new ProductImage
                {
                    ProductId = dto.Id,
                    Url = localName,
                    SortOrder = i
                });
            }
        }

        var composition = dtos.SelectMany(dto => dto.Composition.Select(c => new ProductComposition
        {
            ProductId = dto.Id,
            Item = c.Item,
            Qty = c.Qty
        })).ToList();

        var characteristics = dtos.SelectMany(dto => dto.Characteristics.Select(c => new ProductCharacteristic
        {
            ProductId = dto.Id,
            Key = c.Key,
            Value = c.Value
        })).ToList();

        var reviews = dtos.SelectMany(dto => dto.Reviews.Select(r => new ProductReview
        {
            ProductId = dto.Id,
            AuthorName = r.AuthorName,
            Text = r.Text,
            Rating = r.Rating,
            CreatedAt = r.CreatedAt
        })).ToList();

        if (images.Count > 0)
            await _context.ProductImages.AddRangeAsync(images);

        if (composition.Count > 0)
            await _context.ProductCompositions.AddRangeAsync(composition);

        if (characteristics.Count > 0)
            await _context.ProductCharacteristics.AddRangeAsync(characteristics);

        if (reviews.Count > 0)
            await _context.ProductReviews.AddRangeAsync(reviews);

        await _context.SaveChangesAsync();
    }
}
