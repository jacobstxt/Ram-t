using Riok.Mapperly.Abstractions;
using RamT.Application.Models;
using RamT.Application.Models.SeedDTO;
using RamT.Domain.Entities;

namespace RamT.Application.Mappings;

[Mapper]
public partial class ProductMapper
{
    public partial CharacteristicDto ToDto(ProductCharacteristic src);
    public partial CompositionDto ToDto(ProductComposition src);
    public partial ReviewDto ToDto(ProductReview src);

    public ProductDto ToDto(Product product) => new()
    {
        Id = product.Id,
        Name = product.Name,
        ShortDescription = product.ShortDescription,
        Description = product.Description,
        Manufacturer = product.Manufacturer,
        WarrantyYears = product.WarrantyYears,
        Price = product.Price,
        CategoryId = product.CategoryId,
        CategoryName = product.Category?.Name ?? string.Empty,
        Images = product.Images.OrderBy(i => i.SortOrder).Select(i => i.Url).ToList(),
        Composition = product.Composition.Select(ToDto).ToList(),
        Characteristics = product.Characteristics.Select(ToDto).ToList(),
        Reviews = product.Reviews.Select(ToDto).ToList()
    };

    public List<ProductDto> ToDtoList(List<Product> products) =>
        products.Select(ToDto).ToList();


    [MapperIgnoreTarget(nameof(Product.Images))]
    [MapperIgnoreTarget(nameof(Product.Composition))]
    [MapperIgnoreTarget(nameof(Product.Characteristics))]
    [MapperIgnoreTarget(nameof(Product.Reviews))]
    [MapperIgnoreTarget(nameof(Product.Category))]
    [MapperIgnoreSource(nameof(ProductSeedDTO.Images))]
    [MapperIgnoreSource(nameof(ProductSeedDTO.Composition))]
    [MapperIgnoreSource(nameof(ProductSeedDTO.Characteristics))]
    [MapperIgnoreSource(nameof(ProductSeedDTO.Reviews))]
    public partial Product ToEntity(ProductSeedDTO dto);

    [MapperIgnoreTarget(nameof(ProductComposition.Id))]
    [MapperIgnoreTarget(nameof(ProductComposition.ProductId))]
    [MapperIgnoreTarget(nameof(ProductComposition.Product))]
    public partial ProductComposition ToEntity(CompositionSeedDTO dto);

    [MapperIgnoreTarget(nameof(ProductCharacteristic.Id))]
    [MapperIgnoreTarget(nameof(ProductCharacteristic.ProductId))]
    [MapperIgnoreTarget(nameof(ProductCharacteristic.Product))]
    public partial ProductCharacteristic ToEntity(CharacteristicSeedDTO dto);

    [MapperIgnoreTarget(nameof(ProductReview.Id))]
    [MapperIgnoreTarget(nameof(ProductReview.ProductId))]
    [MapperIgnoreTarget(nameof(ProductReview.Product))]
    public partial ProductReview ToEntity(ReviewSeedDTO dto);

    public List<Product> ToEntityList(List<ProductSeedDTO> dtos) =>
        dtos.Select(ToEntity).ToList();
}
