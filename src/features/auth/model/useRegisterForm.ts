import { useState, FormEvent } from "react";
import { useRegister } from "./useRegister";

export const useRegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const { handleRegister, isLoading, error } = useRegister();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleRegister({ email, name, password, nickName });
  };

  return {
    name,
    email,
    password,
    nickName,
    setName,
    setEmail,
    setPassword,
    setNickName,
    onSubmit,
    isLoading,
  };
};
