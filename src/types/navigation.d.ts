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
  Registration: undefined;
  AuthSuccess: undefined;
  EmailSignIn: undefined;
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
  MainTabs: undefined;
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
  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;
  BusinessAdministrators: undefined;
  EditAdministrator: {
    administrator: Administrator | null;
  };
  AddAdministrator: undefined;
};

export type OrderNavigator = {
  OrderPage: undefined;
  orderDetail: undefined;
};

export type ProductNavigator = {
  ProductsPage: undefined;
  AddProduct: undefined;
  CategoryScreen: undefined;
  ProductDetails: {productId: string};
};

export type HomeNavigator = {
  HomeScreen: undefined;
  NewOrders: {
    filterType?: 'pending' | 'toShip' | 'delivered';
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
