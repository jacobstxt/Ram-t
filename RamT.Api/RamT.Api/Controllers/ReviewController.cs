using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RamT.Application.Models.DTO.Products;
using RamT.Application.Services;
using RamT.Infrastructure.Identity;

namespace RamT.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ReviewController(ProductService productService, UserManager<AppUser> userManager) : ControllerBase
{
    [HttpPost("{productId:int}")]
    public async Task<IActionResult> Create(int productId, [FromBody] CreateReviewDto dto)
    {
        if (dto.Rating < 1 || dto.Rating > 5)
            return BadRequest("Рейтинг має бути від 1 до 5.");

        if (string.IsNullOrWhiteSpace(dto.Text))
            return BadRequest("Текст відгуку не може бути порожнім.");

        var user = await userManager.GetUserAsync(User);
        if (user is null)
            return Unauthorized();

        var authorName = $"{user.FirstName} {user.LastName}".Trim();
        var created = await productService.CreateReviewAsync(productId, dto, user.Id, authorName);

        return created ? Ok() : NotFound();
    }
}
