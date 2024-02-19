import { AuthService, decodeJwt } from "@/services/auth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const userIdTokenKey =
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";

export const chatIdTokenKey =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/chatidentifier";

export const useChatData = (isAdmin: boolean) => {
  const [userId, setUserId] = useState<string>("");
  const [chatId, setChatId] = useState<string>("");
  const searchParams = useSearchParams();

  const refresh = AuthService.getRefreshToken();
  const decodeToken = decodeJwt(refresh);

  useEffect(() => {
    const chatUrlId = isAdmin
      ? searchParams.get("chat")
      : decodeToken?.payload[chatIdTokenKey];
    if (decodeToken) setUserId(decodeToken?.payload[userIdTokenKey]);
    setChatId(chatUrlId);
  }, [, refresh, isAdmin, decodeToken]);

  return { chatId, userId };
};
