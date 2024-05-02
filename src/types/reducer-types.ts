import { CartItem, ShippingInfo, User } from "./types";

export interface userReducerInitialState {
  user: User | null;
  loading: boolean;
}

export interface cartReducerInitialState {
  loading: boolean;
  subtotal: number;
  shippingCharges: number;
  tax: number;
  discount: number;
  total: number;
  cartItems: CartItem[];
  shippingInfo: ShippingInfo;
}
