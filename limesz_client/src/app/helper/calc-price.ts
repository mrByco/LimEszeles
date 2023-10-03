import { FoodExtra, FoodSize, FoodVariationItem, OrderItem } from "../api/models";

export function getTotalPrice(selectedFoodSize: FoodSize, selectedFoodVariations: FoodVariationItem[], selectedFoodExtras: FoodExtra[]) {
  let price = selectedFoodSize?.price ?? 0;
  for (let variation of selectedFoodVariations) {
    let modifier = variation.priceModifier;
    if (variation.priceModifier?.endsWith('%')) {
      modifier = modifier!.replace("%", "");
      let number = parseInt(modifier);
      price += price * (number / 100);
      continue;
    }
    price += parseInt(modifier!);
  }

  for (let extra of selectedFoodExtras) {
    price += extra.price ?? 0;
  }
  return price;
}

export function getTotalPriceForOrderItem(orderItem: OrderItem) {
  return orderItem.count * getTotalPrice(orderItem.selectedSizeSnapshot!, orderItem.selectedVariationsSnapshot!, orderItem.selectedExtrasSnapshot!);
}