import { Permission } from "../api/models";

export class PERMISSIONS {
    static readonly list_restaurants = "list_restaurants";
    static readonly edit_menu = "edit_menu";
    static readonly edit_restaurant = "edit_restaurant";
    static readonly read_orders = "read_orders";
    static readonly write_orders = "write_orders";
    static readonly register_restaurant = "register_restaurant";
    static readonly delete_restaurant = "delete_restaurant";
    static readonly manage_employees = "manage_employees";
    static readonly read_employees = "read_employees";
    static readonly dashboard = "dashboard";
    static readonly receive_contact_email = "receive_contact_email";
    static readonly internal_use_only = "internal_use_only";
    static readonly documents = "documents";
    static readonly read_licenses = "read_licenses";
    static readonly write_licenses = "write_licenses";
    static readonly read_tables = "read_tables";
    static readonly write_tables = "write_tables";
    static readonly write_discounts = "write_discounts";
}

export function permissionIdToName(id: number): string {
    let permissionIds = Object.keys(Permission).filter(x => !isNaN(Number(x))).map(x => Number(x));
    for (let i of permissionIds) {
        if (i == id) return (Object.keys(PERMISSIONS))[i];
    };
    return "unknown_permission";
}