using System.Net;
using Amazon.Runtime.Internal.Util;
using DnsClient.Protocol;
using Microsoft.AspNetCore.Mvc;
using Pluto.Models;
using Pluto.Models.AccessControl;
using pluto.Services.Roles;
using pluto.Services.User;
using ILogger = Microsoft.Extensions.Logging.ILogger;

namespace pluto.Misc
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

        public static void CHECK_PERMISSION(this ControllerBase controller, string permission)
        {
            CHECK_PERMISSION(controller, permission, RoleSpace.System.RoleSpaceKind, null);
        }
        
        public static void CHECK_PERMISSION(this ControllerBase controller, string permission, string roleSpace,
            string? subject = null)
        {
            var user = GetUser(controller);
            if (user == null) throw new System.Web.Http.HttpResponseException(HttpStatusCode.Unauthorized);

            var hasPermission = CheckUserHasPermissionInRoleSpace(user, permission, roleSpace, subject);

            if (!hasPermission) throw new System.Web.Http.HttpResponseException(HttpStatusCode.Unauthorized);
        }

        public static bool CheckUserHasPermissionInRoleSpace(User user, string permission, string roleSpaceKind, string? subject = null)
        {
            var parentRoleSpaces = RoleSpace.AllRoleSpaces
                .FirstOrDefault(r => r.RoleSpaceKind == roleSpaceKind)?
                .GetDistinctParentsKinds();
            if (parentRoleSpaces == null)
            {
                // TODO: Log warning
                return false;
            }
            var roleIds = user.Roles
                .Where(r => parentRoleSpaces.Contains(r.RoleSpaceKind) && (r.Subject == subject || r.Subject == null))
                .SelectMany(r => r.Roles);
            List<Role> roles = RolesResource.Instance.GetMany(roleIds);
            return roles.Exists(r => r.Permissions.Contains(permission));
        }
    }
}

