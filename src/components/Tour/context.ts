import { createContext, use } from 'react';
import { TourContextType } from './typings';

export const TourContext = createContext<TourContextType | null>(null);

export const useTourContext = () => {
    const context = use(TourContext);
    if (!context) {
        throw new Error('useTourContext must be used within a Tour');
    }
    return context;
};
