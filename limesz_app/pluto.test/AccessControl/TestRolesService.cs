using Pluto.Models;
using Pluto.Models.AccessControl;
using pluto.Services.Roles;

namespace pluto.test.AccessControl;

public class TestRolesService
{

    public User AdminUser => new User()
    {
        Id = "admin",
        Roles = new List<RolesItem>
        {
            new RolesItem()
            {
                RoleSpaceKind = "system",
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
                RoleSpaceKind = "system",
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
        RolesResource.Instance = new MockRolesResource()
        {
            RolesInsideCollection = new List<Role>
            {
                new Role
                {
                    Id = "sysadmin",
                    RoleSpaceKind = "system",
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
        Assert.Pass();
    }
}