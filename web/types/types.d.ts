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

interface GlobalStateProps {
  children: ReactNode;
}
