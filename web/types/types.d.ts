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
  children: ReactNode;
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
