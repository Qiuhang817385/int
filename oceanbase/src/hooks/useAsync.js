import { useState, useCallback, useEffect } from 'react'
const useAsync = (asyncFunction, immediate = true) => {
  const [pending, setPending] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    setPending(true);
    setValue(null);
    setError(null);
    return asyncFunction()
      .then(response => setValue(response))
      .catch(error => setError(error))
      .finally(() => setPending(false));
  }, [asyncFunction])


  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate])

  // execute 是事后处理函数
  return { execute, pending, value, error };
}


export default useAsync;