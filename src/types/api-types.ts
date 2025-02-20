import { Bar, CartItem, Line, Order, Pie, Product, ShippingInfo, Stats, User } from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type AllUsersResponse = {
  success: boolean;
  users: User[];
};

export type AllProductsResponse = {
  success: boolean;
  products: Product[];
};

export type CategoriesResponse = {
  success: boolean;
  categories: string[];
};

export type SearchProductsResponse = AllProductsResponse & {
  totalPage: number;
};

export type SearchProductsRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};

export type NewProductRequest = {
  id: string;
  formData: FormData;
};

export type ProductResponse = {
  success: boolean;
  product: Product;
};

export type UpdateProductRequest = {
  formData: FormData;
  userId: string;
  productId: string;
};

export type DeleteProductRequest = {
  userId: string;
  productId: string;
};

export type NewOrderRequest = {
  subtotal: number;
  shippingCharges: number;
  tax: number;
  discount: number;
  total: number;
  orderItems: CartItem[];
  shippingInfo: ShippingInfo;
  user: string;
};

export type AllOrdersResponse = {
  success: boolean;
  orders: Order[];
};

export type OrderDetailsResponse = {
  success: boolean;
  order: Order;
};

export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
}

export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
}

export type StatsResponse = {
  success: boolean;
  stats: Stats;
};

export type PieResponse = {
  success: boolean;
  charts: Pie;
}

export type BarResponse = {
  success: boolean;
  charts: Bar;
}

export type LineResponse = {
  success: boolean;
  charts: Line;
}
