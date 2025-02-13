export interface FilterOption {
  id: string;
  label: string;
  isSelected: boolean;
}

export interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
}

export interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (selectedFilters: FilterSection[]) => void;
  sections: FilterSection[];
}
