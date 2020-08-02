import { useState, useEffect } from 'react';
const useDebounce = (value, delay = 300) => {

  // 这里的初始值是value,其实我觉得都行??
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {

    const handlerDebounce = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handlerDebounce)
    }
  }, [value, delay])

  return {
    debouncedValue
  }
}

export default useDebounce;
