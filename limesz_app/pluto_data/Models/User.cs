﻿using MongoDB.Bson.Serialization.Attributes;
using Pluto.Models.AccessControl;
using Pluto.Models.Auth;

namespace Pluto.Models
{
    [BsonIgnoreExtraElements]
    public class User : BaseRootModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime LastLogin { get; set; }
        public DateTime RegistrationDate { get; set; }
        public List<TokenKey> RefreshTokenKeys { get; set; } = new List<TokenKey>();
        public PasswordResetToken? PasswordResetToken { get; set; }
        public bool EmailVerifyed { get; set; }
        public UserRoles Roles { get; set; } = new UserRoles();

        public static readonly RoleSpace RoleSpace = RoleSpace.For<User>("user");
    }
}