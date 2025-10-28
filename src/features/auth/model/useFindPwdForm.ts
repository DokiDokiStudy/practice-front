import { useState, FormEvent } from "react";
import { useFindPwd } from "./useFindPwd";

export const useFindPwdForm = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const { submitted, isLoading, handleFindPwd, navigate } = useFindPwd();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleFindPwd(id, email);
  };

  return {
    id,
    email,
    setId,
    setEmail,
    onSubmit,
    submitted,
    isLoading,
    navigate,
  };
};
