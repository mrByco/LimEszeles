import { DeliveryOrderDto, OrderItem } from "../api/models";
import { display } from "./display-languagestring";

export function orderDtoToLines(order: DeliveryOrderDto, mode: "deliveryInfo" | "items"): string[] {
    if (mode == "deliveryInfo") {
        return [
            `Név: ${order.contactInfo?.deliveryName}`,
            `Tel szám: ${order.contactInfo?.delivieryPhone}`,
            `Email: ${order.contactInfo?.deliveryEmail}`,
            `Irányítószám: ${order.deliveryAddress?.deliveryZipCode}`,
            `Utca, házszám: ${order.deliveryAddress?.deliveryStreet}`,
            `Kapucsengő, emelet, ajtó: ${order.deliveryAddress?.deliveryDoorNumber}`,
            `Fizetendő: ${order.price}Ft`,
            `Megjegyzés: ${order.comment}`,
        ]
    } else {
        return order.items?.map(o => o.count?.toString() + "db, " + display(o.selectedFoodSnapshot?.name!) + ", " + orderItemToString(o))!;
    }
}

export function orderItemToStringWithName(item: OrderItem): string {
    return display(item!.selectedFoodSnapshot.name!) + ' - ' + orderItemToString(item);
}
export function orderItemToString(item: OrderItem): string {
    return display(item.selectedSizeSnapshot!.name!) + ', ' + item.selectedVariationsSnapshot!.map(variation => ' ' + display(variation.name!)) + ' ' + item.selectedExtrasSnapshot!.map(extra => ' ' + display(extra.name!));
}