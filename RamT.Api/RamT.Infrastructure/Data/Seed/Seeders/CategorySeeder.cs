
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using RamT.Application.Interfaces;
using RamT.Application.Models.SeedDTO;
using RamT.Domain.Entities;

namespace RamT.Infrastructure.Data.Seed.Seeders;

public class CategorySeeder : ISeeder
{
    private readonly AppDbContext _context;

    public CategorySeeder(AppDbContext context)
    {
        _context = context;
    }

    public async Task SeedAsync()
    {
        if (await _context.Categories.AnyAsync())
            return;

        var jsonPath = Path.Combine(
            AppContext.BaseDirectory,
            "Data", "Seed", "JsonSeedData", "Categories.json");

        var json = await File.ReadAllTextAsync(jsonPath);

        var dtos = JsonSerializer.Deserialize<List<CategorySeedDTO>>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        }) ?? [];

        // Спочатку вставляємо батьківські категорії (ParentCategoryId == null)
        var parents = dtos.Where(c => c.ParentCategoryId == null).Select(dto => new Category
        {
            Id = dto.Id,
            Name = dto.Name,
            Slug = dto.Slug,
            ParentCategoryId = null
        }).ToList();

        await _context.Categories.AddRangeAsync(parents);
        await _context.SaveChangesAsync();

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
            await _context.Categories.AddRangeAsync(children);
            await _context.SaveChangesAsync();
        }
    }
}
