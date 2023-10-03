using System;
using margarita_data.Models;
using margarita_data.Roles;

namespace margarita_app.Roles
{
	public static class RestaurantRoles
	{
		private static readonly Dictionary<ERestaurantRole, List<Permission>> _PermissionsMap = new Dictionary<ERestaurantRole, List<Permission>>()
        {
            { ERestaurantRole.OWNER,  Enum.GetValues<Permission>().Where(p => p != Permission.internal_use_only).ToList() },

            { ERestaurantRole.ADMIN, new List<Permission> { Permission.dashboard, Permission.edit_menu , Permission.edit_restaurant, Permission.read_orders, Permission.write_orders, Permission.read_employees} }
		};

		private static bool checkRoleHasPermission(ERestaurantRole role, Permission permission)
		{
			if (!_PermissionsMap.ContainsKey(role)) return false;
			var roleRecord = _PermissionsMap[role];
			return roleRecord.Contains(permission);
		}
		
		public static bool CheckUserPermission(User user, string companyId, Permission permission)
        {
            if (AppRoles.CheckUserPermission(user, permission)) return true;
            var rolesForRestaurant = user.CompanyRoles.FirstOrDefault(r => r.CompanyId == companyId);
			if (rolesForRestaurant == null) return false;

            foreach (var roleString in rolesForRestaurant.Roles)
			{
				var role = Enum.Parse<ERestaurantRole>(roleString);
				if (checkRoleHasPermission(role, permission)) return true;
			}

			return false;
		}

	}

	public enum ERestaurantRole
	{
		OWNER,
		ADMIN
	}
}

