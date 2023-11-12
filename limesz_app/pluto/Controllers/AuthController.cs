﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pluto.Misc;
using Pluto.Models;
using Pluto.Models.AccessControl;
using Pluto.Models.Auth;
using pluto.Services.User;

namespace pluto.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _UserService;

        public AuthController(IUserService userService)
        {
            _UserService = userService;
        }

        [HttpPost("login")]
        public AuthResult Login(LoginCredentials credentials)
        {
            return _UserService.AuthenticateUser(credentials.Email, credentials.Password);
        }

        [HttpPost("register")]
        public AuthResult Registration(RegistrationData registrationData)
        {
            _UserService.RegisterUser(registrationData.Username, registrationData.Email, registrationData.Password);
            return _UserService.AuthenticateUser(registrationData.Email, registrationData.Password);
        }

        [HttpPost("refresh-token")]
        public AuthResult RefreshToken(RefreshTokenRequest body)
        {
            return _UserService.RefreshUserToken(body.Token);
        }

        [HttpPost("create-password-reset-token/{email}/{queryParams?}")]
        public Task CreatePasswordResetToken(string email, string? queryParams)
        {
            return _UserService.CreatePasswordResetToken(email, queryParams);
        }

        [HttpPost("reset-password")]
        public AuthResult UsePasswordResetToken(PasswordResetDTO passwordResetBody)
        {
            return _UserService.UsePasswordResetToken(passwordResetBody.Token, passwordResetBody.Password);
        }

        [HttpGet("protected"), Authorize]
        public User? Protected()
        {
            return this.GetUser();
        }

        [HttpGet("has-permission/{permission}/{restaurantId?}")]
        public bool HasPermission(string permission, string? restaurantId)
        {
            var user = this.GetUser();
            if (user == null)
                return false;
            try
            {
                var parsedPermission = (Permission)Enum.Parse(typeof(Permission), permission);
                if (restaurantId == null) this.CHECK_PERMISSION(parsedPermission);
                else this.CHECK_PERMISSION(parsedPermission, restaurantId);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
