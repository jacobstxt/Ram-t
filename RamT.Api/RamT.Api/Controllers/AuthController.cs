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
        var (account, accessToken, refreshToken) = await authService.RegisterAsync(dto);
        SetTokenCookies(accessToken, refreshToken);
        return Ok(account);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var (account, accessToken, refreshToken) = await authService.LoginAsync(dto);
        SetTokenCookies(accessToken, refreshToken);
        return Ok(account);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        var refreshToken = Request.Cookies["refreshToken"]
            ?? throw new InvalidOperationException("Refresh token відсутній.");

        var (account, accessToken, newRefreshToken) = await authService.RefreshAsync(refreshToken);
        SetTokenCookies(accessToken, newRefreshToken);
        return Ok(account);
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        var options = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Path = "/"
        };

        Response.Cookies.Delete("accessToken", options);
        Response.Cookies.Delete("refreshToken", options);
        return NoContent();
    }


    [HttpPost("google")]
    public async Task<IActionResult> Google(GoogleAuthDto dto)
    {
        var (account, accessToken, refreshToken) = await authService.GoogleAuthAsync(dto);
        SetTokenCookies(accessToken, refreshToken);
        return Ok(account);
    }

    private void SetTokenCookies(string accessToken, string refreshToken)
    {
        var baseOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Path = "/"
        };

        Response.Cookies.Append("accessToken", accessToken, new CookieOptions
        {
            HttpOnly = baseOptions.HttpOnly,
            Secure = baseOptions.Secure,
            SameSite = baseOptions.SameSite,
            Path = baseOptions.Path,
            Expires = DateTimeOffset.UtcNow.AddMinutes(15)
        });

        Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
        {
            HttpOnly = baseOptions.HttpOnly,
            Secure = baseOptions.Secure,
            SameSite = baseOptions.SameSite,
            Path = baseOptions.Path,
            Expires = DateTimeOffset.UtcNow.AddDays(30)
        });
    }
}
