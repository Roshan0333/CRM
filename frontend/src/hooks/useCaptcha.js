import { useEffect, useState } from "react";

const chars =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";

export const useCaptcha = () => {
  const [captcha, setCaptcha] = useState("");

  const generate = () => {
    let str = "";
    for (let i = 0; i < 6; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(str);
  };

  useEffect(() => {
    generate();
  }, []);

  return { captcha, regenerate: generate };
};
