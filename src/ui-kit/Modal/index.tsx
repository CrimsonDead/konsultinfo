import dynamic from 'next/dynamic';
import { IModalProps } from './@types';

const LazyModal = dynamic(() => import('./Modal'), { ssr: false });

const Modal = (props: IModalProps) => <LazyModal {...props} />;

export { Modal };
