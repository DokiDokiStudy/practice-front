import { useState, FormEvent } from "react";
import { useFindUser } from "./useFindUser";

export const useFindUserForm = () => {
  const [email, setEmail] = useState("");
  const { submitted, isLoading, handleFindUser, navigate } = useFindUser();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleFindUser(email);
  };

  return {
    email,
    setEmail,
    onSubmit,
    submitted,
    isLoading,
    navigate,
  };
};
