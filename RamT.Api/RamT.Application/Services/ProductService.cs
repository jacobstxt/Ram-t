using AutoMapper;
using RamT.Application.Interfaces;
using RamT.Application.Models;

namespace RamT.Application.Services;

public class ProductService(IProductRepository repository, IMapper mapper)
{
    public async Task<List<ProductDto>> GetAllAsync()
    {
        var products = await repository.GetAllAsync();
        return mapper.Map<List<ProductDto>>(products);
    }

    public async Task<List<ProductDto>> GetByCategoryAsync(int categoryId)
    {
        var products = await repository.GetByCategoryIdAsync(categoryId);
        return mapper.Map<List<ProductDto>>(products);
    }

    public async Task<ProductDto?> GetByIdAsync(int id)
    {
        var product = await repository.GetByIdAsync(id);
        return product is null ? null : mapper.Map<ProductDto>(product);
    }
}
