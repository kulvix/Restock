const validateField = (fieldName, value, formData = {}, requiredFields = []) => {
  const validators = {
    name: (value) => {
      return value.length < 2 ? 'Name must be at least 2 characters long' : null;
    },
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? null : 'Invalid email address';
    },
    phone: (value) => {
      const phoneRegex = /^0[1-9]\d{9}$/; // Local
      return phoneRegex.test(value) ? null : 'Invalid phone number';
    },
    emailOrPhone: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^0[1-9]\d{9}$/; // Local
      return emailRegex.test(value) || phoneRegex.test(value)
        ? null
        : 'Invalid email or phone number';
    },
    password: (value) => {
      if (value.length < 8) return 'Password must be at least 8 characters long';
      if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
      if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
      if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
      return null;
    },
    confirmPassword: (value, formData) => {
      return value !== formData.password ? 'Passwords do not match' : null;
    },
    firstName: (value) => {
      return value.length < 2 ? 'Name must be at least 2 characters long' : null;
    },
    lastName: (value) => {
      return value.length < 2 ? 'Name must be at least 2 characters long' : null;
    },
    address_line1: (value) => {
      return value.length < 2 ? 'Address must be at least 2 characters long' : null;
    },
    state: (value) => {
      return value.length < 2 ? 'State must be at least 2 characters long' : null;
    },
    city: (value) => {
      return value.length < 2 ? 'City must be at least 2 characters long' : null;
    },
    // New Validations
    cardHolderName: (value) => {
      return value.length < 2 ? 'Cardholder name must be at least 2 characters long' : null;
    },
    cardNumber: (value) => {
      const cardNumberRegex = /^\d{16}$/; // 16 digits for a standard card number
      return cardNumberRegex.test(value) ? null : 'Invalid card number';
    },
    expDate: (value) => {
      const expDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // Format MM/YY
      return expDateRegex.test(value) ? null : 'Invalid expiration date (MM/YY)';
    },
    cvv: (value) => {
      const cvvRegex = /^\d{3,4}$/; // 3-4 digits for CVV
      return cvvRegex.test(value) ? null : 'Invalid CVV';
    },
  };

  // Check for required fields
  if (requiredFields.includes(fieldName) && (!value || value.trim() === '')) {
    return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
  }

  // Validate using field-specific validators
  const validate = validators[fieldName];
  if (validate) {
    return validate(value, formData);
  }

  return null; // No errors
};

const validateForm = (formData, requiredFields) => {
  const errors = {};

  for (const field in formData) {
    const error = validateField(field, formData[field], formData, requiredFields);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
};

export default validateForm;
