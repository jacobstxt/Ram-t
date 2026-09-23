using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using RamT.Application.Interfaces;
using RamT.Application.Mappings;
using RamT.Application.Models.SeedDTO;

namespace RamT.Infrastructure.Data.Seed;

public class CategorySeeder(AppDbContext context, CategoryMapper mapper) : ISeeder
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

        var parentDtos = dtos.Where(c => c.ParentCategoryId == null).ToList();
        var childDtos = dtos.Where(c => c.ParentCategoryId != null).ToList();

        Console.WriteLine($"[Seed] Seeding {parentDtos.Count} parent categories...");
        var parents = mapper.ToEntityList(parentDtos);
        await context.Categories.AddRangeAsync(parents);
        await context.SaveChangesAsync();

        if (childDtos.Count > 0)
        {
            Console.WriteLine($"[Seed] Seeding {childDtos.Count} child categories...");
            var children = mapper.ToEntityList(childDtos);
            await context.Categories.AddRangeAsync(children);
            await context.SaveChangesAsync();
        }

        Console.WriteLine($"[Seed] Categories seeded successfully: {dtos.Count} total ({parentDtos.Count} parent, {childDtos.Count} child).");
    }
}
