using System.Net;
using margarita_app.Services;
using margarita_data.Models;
using margarita_data.Roles;
using Microsoft.AspNetCore.Mvc;

namespace margarita_app.Misc
{
    public static class ControllerBaseExtensions
    {

        public static string GetUserId(this ControllerBase controller)
        {
            return controller.User.FindFirst("Id")?.Value!;
        }

        public static string GetUserEmail(this ControllerBase controller)
        {
            return controller.User.FindFirst("Email")?.Value!;
        }

        public static User? GetUser(this ControllerBase controller)
        {
            var userService = UserService.instance;
            return userService.Get(GetUserId(controller));
        }

        public static void CHECK_PERMISSION(this ControllerBase controller, Permission permission, string restaurantId)
        {
            var user = GetUser(controller);
            if (user == null) throw new System.Web.Http.HttpResponseException(HttpStatusCode.Unauthorized);
            /*if (AppRoles.CheckUserPermission(user, permission))
            {
                return;
            }*/

            /* TODO imlement licenses var license = licenseService.GetCurrentLicensesForRestaurant(restaurantId).FirstOrDefault();
            if (license == null || !license.LicenseType.LicensePermissions.Contains(permission))
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.Unauthorized);*/
            // TODO var hasPermission = OLDRoless.CheckUserPermission(user, restaurantId, permission);
            var hasPermission = true;
            if (!hasPermission) throw new System.Web.Http.HttpResponseException(HttpStatusCode.Unauthorized);
        }

        public static bool IsEmployee(this ControllerBase controller, string companyId)
        {
            var user = controller.GetUser();
            if (user == null) return false;
            //TODO return user.CompanyRoles.Any(r => r.CompanyId == companyId);
            return true;
        }


        public static void CHECK_PERMISSION(this ControllerBase controller, Permission permission)
        {
            var user = GetUser(controller);
            if (user == null) throw new System.Web.Http.HttpResponseException(HttpStatusCode.Unauthorized);
            // TODO var hasPermission = AppRoles.CheckUserPermission(user, permission);
            // TODO if (!hasPermission) throw new System.Web.Http.HttpResponseException(HttpStatusCode.Unauthorized);
        }
    }
}

