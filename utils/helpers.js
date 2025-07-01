
// Shuffle array using Fisher-Yates algorithm
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get N random items from an array
export function getRandomItems(array, count) {
  return shuffleArray(array).slice(0, count);
}

// Capitalize the first letter of a string
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Format currency (example: NGN)
export function formatCurrency(amount, currency = 'NGN', locale = 'en-NG') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount);
}

// Debounce function calls (useful for search inputs)
export function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

export function sortAlphabetically(array, key) {
  return [...array].sort((a, b) => {
    const textA = key ? a[key]?.toString().toLowerCase() : a.toString().toLowerCase();
    const textB = key ? b[key]?.toString().toLowerCase() : b.toString().toLowerCase();
    return textA.localeCompare(textB);
  });
}