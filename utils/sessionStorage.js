// Save data to session storage
export const saveToSessionStorage = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data to session storage:", error);
  }
};

// Get data from session storage
export const getFromSessionStorage = (key) => {
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting data from session storage:", error);
    return null;
  }
};
