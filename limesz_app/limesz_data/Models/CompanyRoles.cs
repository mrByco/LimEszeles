namespace margarita_data.Models;

public class CompanyRoles
{
    public string CompanyId { get; set; }
    public List<string> Roles { get; set; } = new List<string>();
}