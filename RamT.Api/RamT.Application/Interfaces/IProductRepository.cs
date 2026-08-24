using RamT.Application.Models.Common;
using RamT.Application.Models.DTO.Products;
using RamT.Domain.Entities;

namespace RamT.Application.Interfaces;

public interface IProductRepository
{
    Task<PagedResult<Product>> GetPagedAsync(ProductQueryParams query);
    Task<Product?> GetByIdAsync(int id);
    Task AddAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(Product product);
}
