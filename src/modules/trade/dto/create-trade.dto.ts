export class CreateTradeDto {
  buyer_id: number;
  seller_id: number;
  product_id: number;
  trade_status: string;
  trade_price: number;
}
