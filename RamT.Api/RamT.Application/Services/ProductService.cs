using RamT.Application.Interfaces;
using RamT.Application.Models;

namespace RamT.Application.Services;

public class ProductService
{
    private readonly IProductRepository _repository;

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<ProductDto>> GetAllAsync()
    {
        var products = await _repository.GetAllAsync();
        return products.Select(MapToDto).ToList();
    }

    public async Task<List<ProductDto>> GetByCategoryAsync(int categoryId)
    {
        var products = await _repository.GetByCategoryIdAsync(categoryId);
        return products.Select(MapToDto).ToList();
    }

    public async Task<ProductDto?> GetByIdAsync(int id)
    {
        var product = await _repository.GetByIdAsync(id);
        return product is null ? null : MapToDto(product);
    }

    private static ProductDto MapToDto(RamT.Domain.Entities.Product product) => new()
    {
        Id = product.Id,
        Name = product.Name,
        Description = product.Description,
        Price = product.Price,
        CategoryId = product.CategoryId,
        CategoryName = product.Category?.Name ?? string.Empty,
        Images = product.Images
            .OrderBy(i => i.SortOrder)
            .Select(i => i.Url)
            .ToList(),
        Characteristics = product.Characteristics
            .Select(c => new CharacteristicDto { Key = c.Key, Value = c.Value })
            .ToList(),
        Reviews = product.Reviews
            .Select(r => new ReviewDto
            {
                AuthorName = r.AuthorName,
                Text = r.Text,
                Rating = r.Rating,
                CreatedAt = r.CreatedAt
            })
            .ToList()
    };
}