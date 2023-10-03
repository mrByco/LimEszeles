using System;
using System.Net;
using margarita_app.Roles;
using margarita_app.Services;
using margarita_app.Services.LicenseService;
using margarita_data.Models;
using margarita_data.Roles;
using Microsoft.AspNetCore.Mvc;

namespace margarita_app.Misc
{
    public static class ControllerBaseExtensions
    {
        public static ILicenseService licenseService;

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
            if (AppRoles.CheckUserPermission(user, permission))
            {
                return;
            }

            var license = licenseService.GetCurrentLicensesForRestaurant(restaurantId).FirstOrDefault();
            if (license == null || !license.LicenseType.LicensePermissions.Contains(permission))
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.Unauthorized);
            var hasPermission = RestaurantRoles.CheckUserPermission(user, restaurantId, permission);
            if (!hasPermission) throw new System.Web.Http.HttpResponseException(HttpStatusCode.Unauthorized);
        }

        public static bool IsEmployee(this ControllerBase controller, string companyId)
        {
            var user = controller.GetUser();
            if (user == null) return false;
            return user.CompanyRoles.Any(r => r.CompanyId == companyId);
        }
        
        public static bool IsAppAdmin(this ControllerBase controller)
        {
            var user = controller.GetUser();
            if (user == null) return false;
            return user.AppRoles.Count > 0;
        }


        public static void CHECK_PERMISSION(this ControllerBase controller, Permission permission)
        {
            var user = GetUser(controller);
            if (user == null) throw new System.Web.Http.HttpResponseException(HttpStatusCode.Unauthorized);
            var hasPermission = AppRoles.CheckUserPermission(user, permission);
            if (!hasPermission) throw new System.Web.Http.HttpResponseException(HttpStatusCode.Unauthorized);
        }
    }
}

