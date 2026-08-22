using AutoMapper;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using RamT.Application.Interfaces;
using RamT.Application.Models.SeedDTO;
using RamT.Domain.Entities;

namespace RamT.Infrastructure.Data.Seed;

public class ProductSeeder(AppDbContext context, IImageService imageService, IMapper mapper) : ISeeder
{
    public async Task SeedAsync()
    {
        if (await context.Products.AnyAsync())
            return;

        var jsonPath = Path.Combine(
            AppContext.BaseDirectory,
            "Data", "Seed", "JsonSeedData", "Products.json");

        var json = await File.ReadAllTextAsync(jsonPath);

        var dtos = JsonSerializer.Deserialize<List<ProductSeedDTO>>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        }) ?? [];

        var products = mapper.Map<List<Product>>(dtos);

        await context.Products.AddRangeAsync(products);
        await context.SaveChangesAsync();

        var images = new List<ProductImage>();
        foreach (var dto in dtos)
        {
            for (int i = 0; i < dto.Images.Count; i++)
            {
                var localName = await imageService.SaveImageFromUrlAsync(dto.Images[i]);
                images.Add(new ProductImage
                {
                    ProductId = dto.Id,
                    Url = localName,
                    SortOrder = i
                });
            }
        }

        var composition = dtos.SelectMany(dto => dto.Composition.Select(c =>
        {
            var entity = mapper.Map<ProductComposition>(c);
            entity.ProductId = dto.Id;
            return entity;
        })).ToList();

        var characteristics = dtos.SelectMany(dto => dto.Characteristics.Select(c =>
        {
            var entity = mapper.Map<ProductCharacteristic>(c);
            entity.ProductId = dto.Id;
            return entity;
        })).ToList();

        var reviews = dtos.SelectMany(dto => dto.Reviews.Select(r =>
        {
            var entity = mapper.Map<ProductReview>(r);
            entity.ProductId = dto.Id;
            return entity;
        })).ToList();

        if (images.Count > 0)
            await context.ProductImages.AddRangeAsync(images);

        if (composition.Count > 0)
            await context.ProductCompositions.AddRangeAsync(composition);

        if (characteristics.Count > 0)
            await context.ProductCharacteristics.AddRangeAsync(characteristics);

        if (reviews.Count > 0)
            await context.ProductReviews.AddRangeAsync(reviews);

        await context.SaveChangesAsync();
    }
}
