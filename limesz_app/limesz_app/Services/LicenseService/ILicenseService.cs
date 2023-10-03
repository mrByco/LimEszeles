using System;
using margarita_data.Models;

namespace margarita_app.Services.LicenseService
{
	public interface ILicenseService
	{

        public List<LicenseInfo> GetLicensesForRestaurant(string restaurantId);
        public List<LicenseInfo> GetCurrentLicensesForRestaurant(string restaurantId);
        public LicenseInfo AddLicense(string restaurantId, LicenseType type, DateTime validUntil);
        public void RemoveLicense(string licenseId);
        public void UpdateLicense(LicenseInfo license);
        public List<string> GetRestaurantIdsWithActiveLicense(int max);
	}
}

