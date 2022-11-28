import { useEffect } from 'react';

import { useDebounce } from './useDebounce';

export const useScroll = (callback: () => void) => {
    const handleScroll = useDebounce(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight &&
            window.innerHeight < document.documentElement.offsetHeight &&
            document.documentElement.scrollTop === 0
        ) {
            return false;
        }

        callback();
    }, 500);

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
};
