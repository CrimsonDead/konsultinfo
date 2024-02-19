import { FC } from "react";

export const Loader: FC<{ width?: number, height?: number }> = ({ width, height }) => (
    <div className="chat__loader">
        <div className="spinner"></div>
    </div>
)