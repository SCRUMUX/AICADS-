export type NavbarSize = 'default' | 'compact';

export interface NavbarUserMenuItem {
  label: string;
  onClick?: () => void;
}

export interface NavbarProps {
  size?: NavbarSize;
  logo: React.ReactNode;
  nav?: React.ReactNode[];
  search?: React.ReactNode;
  notifications?: React.ReactNode;
  avatar?: React.ReactNode;
  username?: string;
  userMenuItems?: NavbarUserMenuItem[];
  sticky?: boolean;
  centerNav?: boolean;
  activeIndex?: number;
  mobileMenu?: React.ReactNode;
  onMobileMenuToggle?: () => void;
  mobileMenuOpen?: boolean;
  className?: string;
  children?: React.ReactNode;
}
