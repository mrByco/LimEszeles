using System;
using margarita_app.Roles;
using margarita_data.Models;

namespace margarita_data.Roles
{
	public static class AppRoles
    {
        private static readonly Dictionary<ERestaurantRole, List<Permission>> _PermissionsMap = new Dictionary<ERestaurantRole, List<Permission>>()
        {
            { ERestaurantRole.ADMIN, Enum.GetValues<Permission>().ToList() }
        };

        private static bool checkRoleHasPermission(ERestaurantRole role, Permission permission)
        {
            if (!_PermissionsMap.ContainsKey(role)) return false;
            var roleRecord = _PermissionsMap[role];
            return roleRecord.Contains(permission);
        }

        public static bool CheckUserPermission(User user, Permission permission)
        {
            foreach (var roleString in user.AppRoles)
            {
                var role = Enum.Parse<ERestaurantRole>(roleString);
                if (checkRoleHasPermission(role, permission)) return true;
            }
            return false;
        }
    }

    public enum EAppRole
    {
        ADMIN,
    }
}

