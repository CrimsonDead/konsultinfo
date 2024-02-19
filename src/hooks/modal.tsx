import { useState } from 'react';

export const useModal = <T,>() => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [modalData, setModalData] = useState<T | null>(null);
  const closeModal = () => {
    setIsOpenedModal(false);
    if (modalData) setModalData(null);
  };

  const openModal = (data?: T) => {
    if (data) {
      setModalData(data);
    }
    setIsOpenedModal(true);
  };

  return {
    isOpened: isOpenedModal,
    closeModal,
    setModalData,
    openModal,
    modalData,
  };
};
