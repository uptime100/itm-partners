const KEY = 'ITM';

export const setToken = tokenDetails => {
  localStorage.setItem(KEY, JSON.stringify(tokenDetails));
};

export const getToken = () => {
  const tokenDetailsString = localStorage.getItem(KEY);

  if (!tokenDetailsString) {
    return null;
  }

  try {
    return JSON.parse(tokenDetailsString);
  } catch (err) {
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem(KEY);
};
