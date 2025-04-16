import { useEffect, useState } from 'react';

export function useAuth (){
    const [isAuthenticated, setisAuthenticated] = useState(false);

    useEffect (() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setisAuthenticated(true);
        } else {
            setisAuthenticated(false);
        }        
}, []);

return {
    isAuthenticated
};
}