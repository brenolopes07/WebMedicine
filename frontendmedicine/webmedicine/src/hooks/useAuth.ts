import { useEffect, useState } from 'react';

export function useAuth (){
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [isRole, setisRole] = useState("");

    useEffect (() => {
        const storedRole = localStorage.getItem('role');
        if (storedRole === "PACIENTE") {
            setisRole("paciente");
        } else if (storedRole === "MEDICO") {
            setisRole("medico");
        };
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setisAuthenticated(true);
        } else {
            setisAuthenticated(false);
        }        
}, []);

return {
    isAuthenticated,
    isRole
};
}