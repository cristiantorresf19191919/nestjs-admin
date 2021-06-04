
export class OrderItemCreateDTO{
    id?: string;
    product_title: string;
    price?: number;
    quantity?: number;
    order_id?:number;
}

const test:OrderItemCreateDTO = {
    "product_title":"a",
    "price":123,
    "quantity":50,
    "order_id":2
}