"use client";

import { FC } from "react";
import { AdminChat, AdminChatList } from ".";

export const AdminPanel: FC = () => {
  return (
    <main className="flex min-h-screen">
      <div className="w-1/4 min-h-screen">
        <AdminChatList />
      </div>
      <div className="w-3/4 min-h-screen bg-white">
        <AdminChat />
      </div>
    </main>
  );
};
