export type CreateStackParamList = {
  CreateAccount: undefined;
  OTPVerification: {
    phoneNumber: string;
  };
  CreateSuccess: undefined;
  EmailSignIn: undefined;
};

export type AuthStackParamList = {
  PhoneNumber: undefined;
  OTPVerification: {
    phoneNumber: string;
  };
  AuthSuccess: undefined;
};

export type OnboardingStackParamList = {
  Splash: undefined;
  Welcome: undefined;
};

export type VATStackParamList = {
  VATVerification: undefined;
  VATSuccess: undefined;
};

export type DashboardStackParamList = {
  Home: undefined;
  Product: undefined;
  Orders: undefined;
  Account: {
    screen?: string;
    params?: object;
  };
};

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
  Create: undefined;
  VAT: undefined;
  Dashboard: undefined;
};

export type AccountSettingsStackParamList = {
  AccountSettings: undefined;
  PersonalInfo: undefined;
  EditField: EditFieldParams;
  CompanyProfile: undefined;
  BankDetails: undefined;
  PaymentInfo: undefined;
  WithdrawScreen: undefined;
  NotificationScreen: undefined;
  FAQScreen: undefined;
  ChatScreen: undefined;
};

export type OrderNavigator = {
  OrderPage: undefined;
  orderDetail: undefined;
};

export type ProductNavigator = {
  ProductsPage: undefined;
  AddProduct: undefined;
  CategoryScreen: undefined;
};

export type HomeNavigator = {
  Home: undefined;
  NewOrders: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
