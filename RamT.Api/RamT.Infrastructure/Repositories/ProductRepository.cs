using Microsoft.EntityFrameworkCore;
using RamT.Application.Interfaces;
using RamT.Application.Models.Common;
using RamT.Application.Models.DTO.Products;
using RamT.Domain.Entities;
using RamT.Infrastructure.Data;

namespace RamT.Infrastructure.Repositories;

public class ProductRepository(AppDbContext context) : IProductRepository
{
    public async Task<PagedResult<Product>> GetPagedAsync(ProductQueryParams query)
    {
        var q = context.Products
            .Include(p => p.Category)
            .Include(p => p.Images.OrderBy(i => i.SortOrder))
            .Include(p => p.Composition)
            .Include(p => p.Characteristics)
            .Include(p => p.Reviews)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(query.Search))
            q = q.Where(p => p.Name.ToLower().Contains(query.Search.ToLower()));

        if (query.CategoryId.HasValue)
        {
            var categoryIds = await GetAllCategoryIdsAsync(query.CategoryId.Value);
            q = q.Where(p => categoryIds.Contains(p.CategoryId));
        }

        q = (query.SortBy?.ToLower(), query.SortDir?.ToLower()) switch
        {
            ("price", "desc") => q.OrderByDescending(p => p.Price),
            ("price", _)      => q.OrderBy(p => p.Price),
            ("name", "desc")  => q.OrderByDescending(p => p.Name),
            ("name", _)       => q.OrderBy(p => p.Name),
            _                 => q.OrderBy(p => p.Id)
        };

        var totalCount = await q.CountAsync();

        var items = await q
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync();

        return new PagedResult<Product>
        {
            Items = items,
            TotalCount = totalCount,
            Page = query.Page,
            PageSize = query.PageSize
        };
    }

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

    private async Task<List<int>> GetAllCategoryIdsAsync(int rootId)
    {
        var all = await context.Categories.ToListAsync();
        var result = new List<int>();
        var queue = new Queue<int>();
        queue.Enqueue(rootId);
        while (queue.Count > 0)
        {
            var id = queue.Dequeue();
            result.Add(id);
            foreach (var child in all.Where(c => c.ParentCategoryId == id))
                queue.Enqueue(child.Id);
        }
        return result;
    }
}
