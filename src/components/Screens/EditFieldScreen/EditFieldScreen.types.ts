// EditFieldScreen.types.ts
export interface FieldValues {
  [key: string]: string;
}

export interface ErrorValues {
  [key: string]: string;
}

export interface Field {
  key: string;
  label: string;
  keyboardType?: string;
  required?: boolean;
  validationType: string;
}

export interface EditFieldParams {
  fieldType: string;
  initialValue?: string;
  initialValues?: FieldValues;
  headerTitle?: string;
  label?: string;
  description?: string;
  captionText?: string;
  keyboardType?: string;
  validationType?: string;
  onSubmitActionType: string;
  multipleFields?: boolean;
  fields?: Field[];
  showCountrySection?: boolean;
  countryCode?: string;
  countryFlag?: string;
  iconComponent?: React.ReactNode;
  iconImage?: string; // Add this for image URL/source
  size?: number;
}

export interface EditFieldScreenProps {
  route: {
    params: EditFieldParams;
  };
  navigation: any;
}
