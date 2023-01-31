import { useState } from "react";

const useLoading = (initialValue = false) => {
  const [loading, setLoading] = useState(initialValue);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return { loading, startLoading, stopLoading };
};

export { useLoading };
