using System;
using margarita_app.Services.Database;
using margarita_data.Models;

namespace margarita_app.Services.LicenseService
{
    public class LicenseService : BaseDataResourceService<LicenseInfo>, ILicenseService
    {
        public LicenseService(IDatabaseService databaseService) : base(databaseService)
        {
        }

        protected override string CollectionName => "Licenses";

        public List<LicenseInfo> GetLicensesForRestaurant(string restaurantId)
        {
            return Get(l => l.RestaurantId == restaurantId);
        }

        public List<LicenseInfo> GetCurrentLicensesForRestaurant(string restaurantId)
        {
            var licenses = Get(l => l.RestaurantId == restaurantId && l.ActivatedDate < UTCNow.GetNow && l.ValidUntil > UTCNow.GetNow);
            return licenses;
        }

        public LicenseInfo AddLicense(string restaurantId, LicenseType type, DateTime validUntil)
        {
            return Create(new LicenseInfo()
            {
                RestaurantId = restaurantId,
                LicenseType = type,
                GrantedDate = UTCNow.GetNow,
                ActivatedDate = UTCNow.GetNow,
                ValidUntil = validUntil
            });
        }

        public void RemoveLicense(string licenseId)
        {
            Remove(licenseId);
        }

        public void UpdateLicense(LicenseInfo license)
        {
            Update(license);
        }

        public List<string> GetRestaurantIdsWithActiveLicense(int max)
        {
            var restaurantIds = Get(l => l.ActivatedDate < UTCNow.GetNow && l.ValidUntil > UTCNow.GetNow).Select(l => l.RestaurantId).Distinct().Take(max).ToList();
            return restaurantIds;
        }
    }
}

