import { useState, FormEvent } from "react";
import { useRegister } from "./useRegister";

export const useRegisterForm = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nickName, setNickName] = useState("");
  const { handleRegister, isLoading, error } = useRegister();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleRegister({ email, password, nickName, confirm });
  };

  return {
    id,
    email,
    password,
    confirm,
    nickName,
    setId,
    setEmail,
    setPassword,
    setConfirm,
    setNickName,
    onSubmit,
    isLoading,
    error,
  };
};
