export interface HeaderIconProps {
  icon: React.FC<{
    size?: number;
    color?: string;
    strokeWidth?: number;
    style?: any;
  }>;
  onPress?: () => void;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export interface HeaderProps {
  profileImage?: string;
  name: string;
  rightIcons: HeaderIconProps[];
}
