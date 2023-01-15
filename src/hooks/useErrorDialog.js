import { useState } from "react";

const useErrorDialog = () => {
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");

  const showError = ({ title = "Error", error = "" }) => {
    setTitle(title);
    setError(error);
  };

  const hideError = () => setError("");

  return { error, title, showError, hideError };
};

export { useErrorDialog };
