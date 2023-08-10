export interface userFormdata {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface loginFormData {
  email: string;
  password: string;
}

export interface GlobalStateProps {
  children: React.ReactNode;
}

export interface OrderStateProps {
  children: React.ReactNode;
}

export interface UserData {
  email: string;
  name: string;
  user_uuid: string;
  userUuid: string;
  access_token: string;
  // Other properties
}

export interface Category {
  name: string;
  description: string;
  category_uuid: string;
}

export interface CategoryProps {
  params: {
    category_uuid: string;
  };
}

export interface CategoryResponse {
  categories: Category[];
}

export interface CategoryFormData {
  category_uuid: string;
}

export interface CategoryItem {
  name: string;
  image: string;
  price: number;
  item_uuid: string;
}

export interface CategoryItemsResponse {
  items: CategoryItem[];
  category_name: string;
}

export interface NavLinks {
  name: string;
  href: string;
}

export interface GlobalContextValue {
  updateIsAuthenticated: (value: boolean) => void;
  isAuthenticated: boolean;
  email: string;
  name: string;
  userUuid: string;
}

export interface OrderContextValue {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  ordersCount?: number;
  setOrdersCount: React.Dispatch<React.SetStateAction<number>>;
  orderTotalPrice?: number;
  setOrderTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

export interface Order {
  order_uuid: string;
  quantity: number;
  status: number;
  image: string;
  total_price: number;
  item_uuid: string;
  name: string;
}
