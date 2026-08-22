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

        var parents = mapper.ToEntityList(dtos.Where(c => c.ParentCategoryId == null).ToList());
        await context.Categories.AddRangeAsync(parents);
        await context.SaveChangesAsync();

        var children = mapper.ToEntityList(dtos.Where(c => c.ParentCategoryId != null).ToList());
        if (children.Count > 0)
        {
            await context.Categories.AddRangeAsync(children);
            await context.SaveChangesAsync();
        }
    }
}
