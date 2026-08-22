namespace RamT.Application.Models;

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Manufacturer { get; set; } = string.Empty;
    public int? WarrantyYears { get; set; }
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public List<string> Images { get; set; } = [];
    public List<CompositionDto> Composition { get; set; } = [];
    public List<CharacteristicDto> Characteristics { get; set; } = [];
    public List<ReviewDto> Reviews { get; set; } = [];
}