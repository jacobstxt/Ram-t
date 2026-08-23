using RamT.Application.Interfaces;
using RamT.Application.Mappings;
using RamT.Application.Models.DTO.Products;

namespace RamT.Application.Services;

public class ProductService(IProductRepository repository, ProductMapper mapper)
{
    public async Task<List<ProductDto>> GetAllAsync()
    {
        var products = await repository.GetAllAsync();
        return mapper.ToDtoList(products);
    }

    public async Task<List<ProductDto>> GetByCategoryAsync(int categoryId)
    {
        var products = await repository.GetByCategoryIdAsync(categoryId);
        return mapper.ToDtoList(products);
    }

    public async Task<ProductDto?> GetByIdAsync(int id)
    {
        var product = await repository.GetByIdAsync(id);
        return product is null ? null : mapper.ToDto(product);
    }
}
