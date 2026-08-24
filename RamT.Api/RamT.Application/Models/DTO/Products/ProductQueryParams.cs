namespace RamT.Application.Models.DTO.Products;

public class ProductQueryParams
{
    public string? Search { get; set; }
    public int? CategoryId { get; set; }
    public string? SortBy { get; set; } 
    public string SortDir { get; set; } = "asc";
    public int Page { get; set; } = 1;
    private int _pageSize = 20;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > 100 ? 100 : value < 1 ? 1 : value;
    }
}
