using pluto.Misc;
using Pluto.Models;
using Pluto.Models.AccessControl;
using pluto.Services.Roles;

namespace pluto.test.AccessControl;

[TestFixture]
public class TestRolesService
{

    public User AdminUser => new User()
    {
        Id = "admin",
        Roles = new List<RolesItem>
        {
            new RolesItem()
            {
                RoleSpaceKind = RoleSpace.System.RoleSpaceKind,
                Roles = new List<string>()
                {
                    "sysadmin"
                }
            }
        }
    };
    public User SysAdminUser => new User()
    {
        Id = "sysadminUser",
        Roles = new List<RolesItem>
        {
            new RolesItem()
            {
                RoleSpaceKind = RoleSpace.System.RoleSpaceKind,
                Roles = new List<string>()
                {
                    "sysadmin"
                }
            }
        }
    };

    public User UniAdminUser => new User()
    {
        Id = "uniAdminUser",
        Roles = new List<RolesItem>
        {
            new RolesItem()
            {
                RoleSpaceKind = "gym",
                Roles = new List<string>()
                {
                    "uniAdmin"
                }
            }
        }
    };

    public User AdminIdUser => new User()
    {
        Id = "adminIdUser",
        Roles = new List<RolesItem>
        {
            new RolesItem()
            {
                RoleSpaceKind = "gym",
                Subject = "gym1",
                Roles = new List<string>()
                {
                    "adminId"
                }
            }
        }
    };

    public User OperatorUser => new User()
    {
        Id = "operatorUser",
        Roles = new List<RolesItem>
        {
            new RolesItem()
            {
                RoleSpaceKind = "gym",
                Subject = "gym1",
                Roles = new List<string>()
                {
                    "operator"
                }
            }
        }
    };
    
    [SetUp]
    public void Setup()
    {
        RoleSpace.CustomRoleSpaces = new List<RoleSpace>()
        {
            new RoleSpace()
            {
                RoleSpaceKind = "gym",
            }
        };
        RolesResource.Instance = new MockRolesResource()
        {
            RolesInsideCollection = new List<Role>
            {
                new Role
                {
                    Id = "sysadmin",
                    RoleSpaceKind = RoleSpace.System.RoleSpaceKind,
                    RoleSpaceSubject = null,
                    Permissions = new()
                    {
                        MockPermissions.Read,
                        MockPermissions.Write,
                        MockPermissions.Delete,
                        MockPermissions.TestFoo1,
                        MockPermissions.TestFoo2,
                        MockPermissions.TestFoo3,
                        MockPermissions.TestBar3,
                    }
                },
                new Role
                {
                    Id = "uniAdmin",
                    RoleSpaceKind = "gym",
                    RoleSpaceSubject = null,
                    Permissions = new()
                    {
                        MockPermissions.Read,
                        MockPermissions.Write,
                        MockPermissions.Delete,
                        MockPermissions.TestFoo1,
                        MockPermissions.TestFoo2,
                        MockPermissions.TestFoo3,
                        MockPermissions.TestBar3,
                    }
                },
                new Role
                {
                    Id = "adminId",
                    RoleSpaceKind = "gym",
                    RoleSpaceSubject = "gym1",
                    Permissions = new()
                    {
                        MockPermissions.Read,
                        MockPermissions.Write,
                        MockPermissions.Delete,
                        MockPermissions.TestFoo1,
                        MockPermissions.TestFoo2,
                        MockPermissions.TestFoo3,
                        MockPermissions.TestBar3,
                    }
                },
                new Role
                {
                    Id = "operator",
                    RoleSpaceKind = "gym",
                    RoleSpaceSubject = "gym1",
                    Permissions = new()
                    {
                        MockPermissions.Read,
                        MockPermissions.TestFoo1,
                        MockPermissions.TestFoo2,
                    }
                }
            }
        };
    }

    [Test]
    public void Test1()
    {
        bool hasPermission = ControllerBaseExtensions.CheckUserHasPermissionInRoleSpace(AdminUser, "NonExistentPermission", "gym");
        Assert.IsFalse(hasPermission);

    }
    [Test]
    public void UniAdminUserHasPermissionInGym()
    {
        bool hasPermission = ControllerBaseExtensions.CheckUserHasPermissionInRoleSpace(UniAdminUser, MockPermissions.Read, "gym");
        Assert.IsTrue(hasPermission);
    }
    [Test]
    public void AdminIdUserHasPermissionInGymWithSubject()
    {
        bool hasPermission = ControllerBaseExtensions.CheckUserHasPermissionInRoleSpace(AdminIdUser, MockPermissions.Write, "gym", "gym1");
        Assert.IsTrue(hasPermission);
    }
    [Test]
    public void OperatorUserDoesNotHavePermissionInGym()
    {
        bool hasPermission = ControllerBaseExtensions.CheckUserHasPermissionInRoleSpace(OperatorUser, MockPermissions.Delete, "gym");
        Assert.IsFalse(hasPermission);
    }

    [Test]
    public void SysAdminUserHasPermissionInSystemAndGym()
    {
        bool hasPermissionSystem = ControllerBaseExtensions.CheckUserHasPermissionInRoleSpace(SysAdminUser, MockPermissions.Read, RoleSpace.System.RoleSpaceKind);
        bool hasPermissionGym = ControllerBaseExtensions.CheckUserHasPermissionInRoleSpace(SysAdminUser, MockPermissions.Read, "gym");
    
        Assert.IsTrue(hasPermissionSystem && hasPermissionGym);
    }
    
    [Test]
    public void SysAdminUserDoesNotHavePermissionInSystemButHasInGym()
    {
        bool hasPermissionSystem = ControllerBaseExtensions.CheckUserHasPermissionInRoleSpace(SysAdminUser, MockPermissions.Write, RoleSpace.System.RoleSpaceKind);
        bool hasPermissionGym = ControllerBaseExtensions.CheckUserHasPermissionInRoleSpace(SysAdminUser, MockPermissions.Write, "gym");
    
        Assert.IsFalse(hasPermissionSystem && hasPermissionGym);
    }




}