import { createContext } from 'react';

export const uploadContextKey = Symbol('uploadContextKey');

export interface UploadContextProps {
    accept: string;
}

export const UploadContext = createContext<UploadContextProps>({ accept: '' });
