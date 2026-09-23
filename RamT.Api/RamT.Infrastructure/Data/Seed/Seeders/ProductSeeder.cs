using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using RamT.Application.Interfaces;
using RamT.Application.Mappings;
using RamT.Application.Models.SeedDTO;
using RamT.Domain.Entities;

namespace RamT.Infrastructure.Data.Seed;

public class ProductSeeder(AppDbContext context, IImageService imageService, ProductMapper mapper) : ISeeder
{
    public async Task SeedAsync()
    {
        if (await context.Products.AnyAsync())
            return;

        const string imageBaseUrl = "https://ram-t.com/wp-content/uploads/";

        var seedDir = Path.Combine(AppContext.BaseDirectory, "Data", "Seed", "JsonSeedData");
        var jsonFiles = Directory.GetFiles(seedDir, "Products_*.json");

        var dtos = new List<ProductSeedDTO>();
        var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        Console.WriteLine("[Seed] Products seeding...");

        foreach (var jsonPath in jsonFiles)
        {
            var json = await File.ReadAllTextAsync(jsonPath);
            var batch = JsonSerializer.Deserialize<List<ProductSeedDTO>>(json, jsonOptions) ?? [];
            dtos.AddRange(batch);
        }

        foreach (var dto in dtos)
            dto.Images = dto.Images.Select(img => imageBaseUrl + img).ToList();

        var products = mapper.ToEntityList(dtos);
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
            var entity = mapper.ToEntity(c);
            entity.ProductId = dto.Id;
            return entity;
        })).ToList();

        var characteristics = dtos.SelectMany(dto => dto.Characteristics.Select(c =>
        {
            var entity = mapper.ToEntity(c);
            entity.ProductId = dto.Id;
            return entity;
        })).ToList();

        var reviews = dtos.SelectMany(dto => dto.Reviews.Select(r =>
        {
            var entity = mapper.ToEntity(r);
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
        Console.WriteLine($"[Seed] Products seeded successfully: {dtos.Count} products.");
    }
}
