export type User = {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
};

export type Product = {
  name: string;
  photo: string;
  price: number;
  category: string;
  stock: number;
  _id: string;
};

export type CartItem = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
  stock: number;
};

export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type Order = {
  shippingInfo: ShippingInfo;
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  orderItems: OrderItem[];
};

type LatestTransaction = {
  _id: string;
  discount: number;
  amount: number;
  quantity: number;
  status: string;
};

type CountAndChange = {
  revenue: number;
  product: number;
  user: number;
  order: number;
};

export type Stats = {
  categoryCount: Record<string, number>[];
  changePercent: CountAndChange;
  count: CountAndChange;
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransactions: LatestTransaction[];
};

type UsersAgeGroup = {
  teen: number;
  adult: number;
  old: number;
};

type OrderFulfillment = {
  processing: number;
  shipped: number;
  delivered: number;
};

type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};

export type Pie = {
  orderFulfillment: OrderFulfillment;
  productCategories: Record<string, number>[];
  stockAvailability: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: RevenueDistribution;
  usersAgeGroup: UsersAgeGroup;
  adminCustomer: {
    admin: number;
    user: number;
  };
};

export type Bar = {
  products: number[];
  users: number[];
  orders: number[];
};

export type Line = {
  products: number[];
  users: number[];
  discount: number[];
  revenue: number[];
};
