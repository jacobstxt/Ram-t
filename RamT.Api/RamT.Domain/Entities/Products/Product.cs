namespace RamT.Domain.Entities;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Manufacturer { get; set; } = string.Empty;
    public int? WarrantyYears { get; set; }
    public decimal Price { get; set; }

    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    public List<ProductImage> Images { get; set; } = [];
    public List<ProductComposition> Composition { get; set; } = [];
    public List<ProductCharacteristic> Characteristics { get; set; } = [];
    public List<ProductReview> Reviews { get; set; } = [];
}
