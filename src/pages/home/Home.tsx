import { useFadeIn } from "@/shared/model";
import { WelcomeSection } from "@/widgets/welcome-section";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function Home() {
  const fadeIn = useFadeIn(125);

  return (
    <div
      className={`flex-1 flex items-center justify-center bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: "url('/images/dokydoky_main.png')",
      }}
    >
      <WelcomeSection />
    </div>
  );
}
