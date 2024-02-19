import { Fragment, useCallback, useEffect, useRef } from 'react';
import cx from 'classnames';
import { useOnClickOutside } from '@/hooks';
import { Transition } from '@headlessui/react';
import { Overlay } from '../Overlay';
import { Portal } from '../Portal';
import { IModalProps } from './@types';
import { CloseIcon } from '@/assets/CloseIcon';

const Modal = (props: IModalProps) => {
  const {
    classes,
    children,
    isOpen,
    isOverlay = true,
    onClose,
    onCloseCross,
  } = props;
  const modalRef = useRef<HTMLDivElement | null>(null);
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  useOnClickOutside(modalRef, onClose, !isOverlay);

  return (
    <Portal>
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0">
        <section
          ref={modalRef}
          id="modal-container"
          className={cx(
            'fixed inset-0 z-30 flex items-center justify-center overflow-hidden p-4',
            classes?.wrapper,
            { hidden: !isOpen },
            {}
          )}>
          {isOverlay && <Overlay onClick={onCloseCross || onClose} />}
          <div
            className={cx('relative w-full max-w-4xl', classes?.modalWindow)}>
            <div className="relative w-full rounded-[40px] bg-white shadow-2xl">
              <div
                className={cx(
                  'absolute right-5 top-8 cursor-pointer text-gray-400',
                  classes?.closeIconContainer
                )}
                onClick={onCloseCross || onClose}>
                <CloseIcon className={cx(classes?.closeIcon)} />
              </div>
              {children}
            </div>
          </div>
        </section>
      </Transition>
    </Portal>
  );
};

export default Modal;
