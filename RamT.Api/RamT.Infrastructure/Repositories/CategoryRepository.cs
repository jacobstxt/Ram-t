using Microsoft.EntityFrameworkCore;
using RamT.Application.Interfaces;
using RamT.Domain.Entities;
using RamT.Infrastructure.Data;

namespace RamT.Infrastructure.Repositories;

public class CategoryRepository(AppDbContext context) : ICategoryRepository
{
    public async Task<List<Category>> GetAllAsync() =>
        await context.Categories
            .Include(c => c.SubCategories)
            .Where(c => c.ParentCategoryId == null)
            .ToListAsync();
}
