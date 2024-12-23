const validateField = (fieldName, value, formData = {}, requiredFields = []) => {
  // return 'Hi';
  const validators = {
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? null : 'Invalid email address';
    },
    phone: (value) => {
      // const phoneRegex = /^\+?[1-9]\d{1,14}$/; // international
      const phoneRegex = /^0[1-9]\d{9}$/; // Local
      return phoneRegex.test(value) ? null : 'Invalid phone number';
    },
    emailOrPhone: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        return null;
      }

      // If not an email, check if it's a valid phone number
      const phoneRegex = /^0[1-9]\d{9}$/; // Local
      if (phoneRegex.test(value)) {
        return null;
      }

      return 'Invalid email or phone number';
    },
    password: (value) => {
      if (value.length < 8) {
        return 'Password must be at least 8 characters long';
      }
      if (!/[A-Z]/.test(value)) {
        return 'Password must contain at least one uppercase letter';
      }
      if (!/[a-z]/.test(value)) {
        return 'Password must contain at least one lowercase letter';
      }
      if (!/[0-9]/.test(value)) {
        return 'Password must contain at least one number';
      }
      return null;
    },
    confirmPassword: (value, formData) => {
      if (value !== formData.password) {
        return 'Passwords do not match';
      }
      return null;
    },
    firstName: (value) => {
      if (value.length < 2) {
        return 'Name must be at least 2 characters long';
      }
      return null;
    },
    lastName: (value) => {
      if (value.length < 2) {
        return 'Name must be at least 2 characters long';
      }
      return null;
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