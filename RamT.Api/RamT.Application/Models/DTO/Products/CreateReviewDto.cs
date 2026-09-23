namespace RamT.Application.Models.DTO.Products;

public class CreateReviewDto
{
    public string Text { get; set; } = string.Empty;
    public int Rating { get; set; }
}
