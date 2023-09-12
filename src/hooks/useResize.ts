import { useState, useEffect } from 'react';

export const useResize = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = (event: UIEvent) => {
            setWidth((event.currentTarget as Window).innerWidth)
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return width
};