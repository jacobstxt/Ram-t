using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using RamT.Application.Interfaces;
using RamT.Application.Models.SeedDTO;
using RamT.Domain.Entities;

namespace RamT.Infrastructure.Data.Seed;

public class CategorySeeder(AppDbContext context) : ISeeder
{
    public async Task SeedAsync()
    {
        if (await context.Categories.AnyAsync())
            return;

        var jsonPath = Path.Combine(
            AppContext.BaseDirectory,
            "Data", "Seed", "JsonSeedData", "Categories.json");

        var json = await File.ReadAllTextAsync(jsonPath);

        var dtos = JsonSerializer.Deserialize<List<CategorySeedDTO>>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        }) ?? [];

        var parents = dtos.Where(c => c.ParentCategoryId == null).Select(dto => new Category
        {
            Id = dto.Id,
            Name = dto.Name,
            Slug = dto.Slug,
            ParentCategoryId = null
        }).ToList();

        await context.Categories.AddRangeAsync(parents);
        await context.SaveChangesAsync();

        // Потім вставляємо дочірні категорії
        var children = dtos.Where(c => c.ParentCategoryId != null).Select(dto => new Category
        {
            Id = dto.Id,
            Name = dto.Name,
            Slug = dto.Slug,
            ParentCategoryId = dto.ParentCategoryId
        }).ToList();

        if (children.Count > 0)
        {
            await context.Categories.AddRangeAsync(children);
            await context.SaveChangesAsync();
        }
    }
}
