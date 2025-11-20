import { useState, FormEvent } from "react";
import { useLogin } from "./useLogin";

export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, isLoading } = useLogin();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    onSubmit,
    isLoading,
  };
};
