// RamT.Infrastructure/Repositories/ProductRepository.cs
using Microsoft.EntityFrameworkCore;
using RamT.Application.Interfaces;
using RamT.Domain.Entities;
using RamT.Infrastructure.Data;

namespace RamT.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Product>> GetAllAsync() =>
        await _context.Products.Include(p => p.Category).ToListAsync();

    public async Task<List<Product>> GetByCategoryIdAsync(int categoryId) =>
        await _context.Products
            .Include(p => p.Category)
            .Where(p => p.CategoryId == categoryId)
            .ToListAsync();

    public async Task<Product?> GetByIdAsync(int id) =>
        await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id);

    public async Task AddAsync(Product product)
    {
        await _context.Products.AddAsync(product);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Product product)
    {
        _context.Products.Update(product);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Product product)
    {
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
    }
}