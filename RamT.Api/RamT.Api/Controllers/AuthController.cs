using Microsoft.AspNetCore.Mvc;
using RamT.Application.Interfaces;
using RamT.Application.Models.DTO.Auth;

namespace RamT.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var result = await authService.RegisterAsync(dto);
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var result = await authService.LoginAsync(dto);
        return Ok(result);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh(RefreshDto dto)
    {
        var result = await authService.RefreshAsync(dto);
        return Ok(result);
    }

    [HttpPost("google")]
    public async Task<IActionResult> Google(GoogleAuthDto dto)
    {
        var result = await authService.GoogleAuthAsync(dto);
        return Ok(result);
    }
}
