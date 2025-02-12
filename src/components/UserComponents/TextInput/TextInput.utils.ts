export const validateInput = (value: string, type?: string): string | null => {
  if (!value.trim()) return 'This field is required';

  if (type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Invalid email address';
  }

  if (type === 'phone') {
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    if (!phoneRegex.test(value)) return 'Invalid phone number';
  }

  return null;
};
