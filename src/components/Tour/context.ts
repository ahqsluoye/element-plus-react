import { createContext, useContext } from 'react';
import { TourContextType } from './typings';

export const TourContext = createContext<TourContextType | null>(null);

export const useTourContext = () => {
    const context = useContext(TourContext);
    if (!context) {
        throw new Error('useTourContext must be used within a Tour');
    }
    return context;
};
