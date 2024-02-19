"use client";

import { FC, useEffect, useState } from "react";
import { Loader, Search } from "@/ui-kit";
import cx from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store";
import { fetchChat, fetchUser, searchChat } from "@/store/slices/user";
import { useSelector } from "react-redux";
import { useChatData } from "@/hooks";

export const AdminChatList: FC = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chat");
  const chatsArray = useSelector((store: any) => store.user.user.chats) || [];
  const loading = useSelector((store: any) => store.user.loading) || false;
  const searchLoading =
    useSelector((store: any) => store.user.chatSearchLoading) || false;

  const { userId } = useChatData(true);

  useEffect(() => {
    const interval = setInterval(
      () => dispatch(fetchUser({ userId, isAdmin: true })),
      7000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!!userId) dispatch(fetchUser({ userId, isAdmin: true }));
  }, [, userId]);

  const handleFetchSelectedChat = (id: string) =>
    dispatch(fetchChat({ chatId: id }));

  useEffect(() => {
    if (loading) return;
    if (chatId) {
      const selectedChatObject = chatsArray
        .map((item: any, index: number) => ({ id: item.id, index }))
        .find((item: any) => item.id === chatId);
      setSelectedChat(selectedChatObject?.index);
      handleFetchSelectedChat(selectedChatObject?.id);
    }
    setChats(chatsArray);
  }, [, chatId, chatsArray]);

  const onSearchHandleChange = (value: string) => setSearchValue(value);
  const handleSearch = () => {
    if (searchValue !== "") {
      dispatch(searchChat({ username: searchValue }));
      return;
    }
    dispatch(fetchUser({ userId, isAdmin: true }));
  };

  // TODO: Will be used later, after api whould be created
  // const onSearchHandleChange = useCallback(
  //   debounce((value: string) => {}, 1500),
  //   []
  // );

  return (
    <main className="flex h-screen max-h-screen bg-[#271d36] flex-col overflow-y-scroll relative overflow-hidden">
      <div className="p-3">
        <Search
          searchValue={searchValue}
          onChange={onSearchHandleChange}
          onClick={handleSearch}
        />
      </div>
      {searchLoading && <Loader />}
      {!searchLoading &&
        chats?.map((item: any, index) => {
          return (
            <div
              className={cx(
                "h-[72px] rounded-lg m-2 p-3 border-4 bg-white text-ellipsis pb-8",
                selectedChat === index ? "border-rose-500" : "border-gray-50"
              )}
              onClick={() => {
                router.push(`?chat=${item?.id}`);
                setSelectedChat(index);
                handleFetchSelectedChat(item?.id);
              }}
            >
              <div className="text-xl font-semibold">{item.username}</div>
              <div className="text-xl truncate">{item?.lastMessage}</div>
            </div>
          );
        })}
    </main>
  );
};
