using System;
using margarita_app.Misc;
using margarita_app.Services;
using margarita_app.Services.LicenseService;
using margarita_data.Models;
using margarita_data.Roles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace margarita_app.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LicenseController : ControllerBase
    {
        private readonly ILicenseService _licenseService;

        public LicenseController(ILicenseService licenseService)
        {
            _licenseService = licenseService;
        }

        [HttpGet("{restaurantId}"), Authorize]
        public List<LicenseInfo> GetLicenses(string restaurantId)
        {
            this.CHECK_PERMISSION(Permission.read_licenses, restaurantId);
            return _licenseService.GetLicensesForRestaurant(restaurantId);
        }

        [HttpGet("current/{restaurantId}")]
        public LicenseInfo? GetCurrentLicense(string restaurantId)
        {
            this.CHECK_PERMISSION(Permission.read_licenses, restaurantId);
            return _licenseService.GetCurrentLicensesForRestaurant(restaurantId).FirstOrDefault();
        }

        [HttpPost("{restaurantId}/{months}"), Authorize]
        public LicenseInfo AddLicense(string restaurantId, LicenseType licenseType, int months)
        {
            this.CHECK_PERMISSION(Permission.write_licenses, restaurantId);
            var validUntil = UTCNow.GetNow.AddMonths(months);
            return _licenseService.AddLicense(restaurantId, licenseType, validUntil);
        }

        [HttpPut("{restaurantId}"), Authorize]
        public void UpdateLicense(string restaurantId, LicenseInfo license)
        {
            this.CHECK_PERMISSION(Permission.write_licenses, license.RestaurantId);
            _licenseService.UpdateLicense(license);
        }

        [HttpDelete("{restaurantId}/{licenseId}"), Authorize]
        public void RemoveLicense(string restaurantId, string licenseId)
        {
            this.CHECK_PERMISSION(Permission.write_licenses, restaurantId);
            _licenseService.RemoveLicense(licenseId);
        }

    }
}

