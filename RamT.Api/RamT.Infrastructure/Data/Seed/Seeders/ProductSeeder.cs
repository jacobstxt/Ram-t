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

    public ProductSeeder(AppDbContext context)
    {
        _context = context;
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
            Description = dto.Description,
            Price = dto.Price,
            CategoryId = dto.CategoryId
        }).ToList();

        await _context.Products.AddRangeAsync(products);
        await _context.SaveChangesAsync();
    }
}
