import { defaultIfEmpty } from "rxjs"

export function getOrderStateName(state: number) {
    switch (state) {
        case 2:
            return "ORDER_STATE.RECORDED"
        case 4:
            return "ORDER_STATE.ACCEPTED"
        case 6:
            return "ORDER_STATE.COOK_IN_PROGRESS"
        case 10:
            return "ORDER_STATE.ASSIGNED_FOR_DELIVERY"
        case 12:
            return "ORDER_STATE.DELIVERY_IN_PROGRESS"
        case 14:
            return "ORDER_STATE.DELIVERED"
    }
    return "State " + state.toString();
}