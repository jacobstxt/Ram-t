using Microsoft.EntityFrameworkCore;
using RamT.Application.Interfaces;
using RamT.Domain.Entities;
using RamT.Infrastructure.Data;

namespace RamT.Infrastructure.Repositories;

public class ProductRepository(AppDbContext context) : IProductRepository
{
    public async Task<List<Product>> GetAllAsync() =>
        await context.Products
            .Include(p => p.Category)
            .Include(p => p.Images.OrderBy(i => i.SortOrder))
            .Include(p => p.Composition)
            .Include(p => p.Characteristics)
            .Include(p => p.Reviews)
            .ToListAsync();

    public async Task<List<Product>> GetByCategoryIdAsync(int categoryId) =>
        await context.Products
            .Include(p => p.Category)
            .Include(p => p.Images.OrderBy(i => i.SortOrder))
            .Include(p => p.Composition)
            .Include(p => p.Characteristics)
            .Include(p => p.Reviews)
            .Where(p => p.CategoryId == categoryId)
            .ToListAsync();

    public async Task<Product?> GetByIdAsync(int id) =>
        await context.Products
            .Include(p => p.Category)
            .Include(p => p.Images.OrderBy(i => i.SortOrder))
            .Include(p => p.Composition)
            .Include(p => p.Characteristics)
            .Include(p => p.Reviews)
            .FirstOrDefaultAsync(p => p.Id == id);

    public async Task AddAsync(Product product)
    {
        await context.Products.AddAsync(product);
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Product product)
    {
        context.Products.Update(product);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Product product)
    {
        context.Products.Remove(product);
        await context.SaveChangesAsync();
    }
}