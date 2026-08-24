using RamT.Application.Interfaces;
using RamT.Application.Mappings;
using RamT.Application.Models.Common;
using RamT.Application.Models.DTO.Products;

namespace RamT.Application.Services;

public class ProductService(IProductRepository repository, ProductMapper mapper)
{
    public async Task<PagedResult<ProductDto>> GetPagedAsync(ProductQueryParams query)
    {
        var result = await repository.GetPagedAsync(query);
        return new PagedResult<ProductDto>
        {
            Items = mapper.ToDtoList(result.Items),
            TotalCount = result.TotalCount,
            Page = result.Page,
            PageSize = result.PageSize
        };
    }

    public async Task<ProductDto?> GetByIdAsync(int id)
    {
        var product = await repository.GetByIdAsync(id);
        return product is null ? null : mapper.ToDto(product);
    }

    public async Task<ProductDto?> GetBySlugAsync(string slug)
    {
        var product = await repository.GetBySlugAsync(slug);
        return product is null ? null : mapper.ToDto(product);
    }
}
