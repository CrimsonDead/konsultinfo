import React, { FC, memo } from 'react';
import cx from 'classnames';

interface IOverlayProps {
  classes?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => void;
}

export const Overlay: FC<IOverlayProps> = memo((props) => {
  const { classes, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={cx(
        'fixed bottom-0 left-0 right-0 top-0 cursor-pointer items-center justify-center bg-[#878B92] opacity-80',
        classes,
      )}
    />
  );
});
