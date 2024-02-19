import { ReactNode } from 'react';

export interface IModalProps {
  classes?: {
    wrapper?: string;
    modalWindow?: string;
    headerTitle?: string;
    closeIconContainer?: string;
    closeIcon?: string;
  };
  children?: ReactNode;
  onClose: (
    e?: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent> | Event
  ) => void;
  onCloseCross?: () => void;
  isOpen?: boolean;
  isOverlay?: boolean;
}
