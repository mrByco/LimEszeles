using limesz_app.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pluto.Misc;
using Pluto.Models;
using pluto.Services.User;

namespace limesz_app.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _UserService;

        public UserController(UserService userService)
        {
            _UserService = userService;
        }


        [HttpGet, Authorize]
        public UserProfileDTO GetMe(){
            UserProfileDTO userProfile = new UserProfileDTO();
            User? user = this.GetUser();
            if (user == null)
            {
                return null;
            }
            userProfile.Id = user.Id;
            userProfile.Email = user.Email;
            userProfile.Name = user.Username;

            return userProfile;
        }
        
        [HttpDelete, Authorize]
        public void DeleteUser()
        {
            User? user = this.GetUser();
            if (user == null)
            {
                return;
            }
            _UserService.DeleteUserAccount(user.Email);
        }



        [HttpGet("check-payment-user-id/{userId}")]
        public string? CheckPaymentUserId(string userId)
        {
            try
            {
                var user = _UserService.Get(userId);
                return user!.Username;
            }
            catch
            {
                return null;
            }
        }
    }
}

