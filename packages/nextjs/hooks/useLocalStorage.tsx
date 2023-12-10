import { useEffect, useState } from "react";

export const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
      }
    } catch (error) {
      console.error(`Error retrieving value from local storage: ${error}`);
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error storing value in local storage: ${error}`);
    }
  }, [key, value]);

  return [value, setValue];
};
