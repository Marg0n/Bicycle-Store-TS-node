import { IOrder } from "./order.interface"
import order from "./order.model"

// order a bicycle
const orderCycle = async function(orderData: IOrder): Promise<IOrder> {
    
    const result = await order.create(orderData);

    return result;
}

export const orderService = {
    orderCycle,
}