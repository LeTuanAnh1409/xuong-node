import { useState } from 'react';

const useLocalStorage = (key, defaultValue) => {
    const [state, setState] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    });

    const setValue = (value) => {
        setState(value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    return [state, setValue];
};

export default useLocalStorage;
