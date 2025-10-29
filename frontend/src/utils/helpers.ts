export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatDate = (date: string): string => {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return d.toLocaleDateString('en-IN', options);
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'pm' : 'am';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const calculateTotal = (
  price: number, 
  quantity: number, 
  promoCode?: { discountType: string; discountValue: number }
): { subtotal: number; taxes: number; discount: number; total: number } => {
  const subtotal = price * quantity;
  let discount = 0;

  if (promoCode) {
    if (promoCode.discountType === 'percentage') {
      discount = (subtotal * promoCode.discountValue) / 100;
    } else {
      discount = promoCode.discountValue;
    }
  }

  const afterDiscount = subtotal - discount;
  const taxes = Math.round(afterDiscount * 0.06);
  const total = afterDiscount + taxes;

  return { subtotal, taxes, discount, total };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};