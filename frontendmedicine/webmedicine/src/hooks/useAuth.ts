import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export function useAuth (){
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [isRole, setisRole] = useState("");
    const router = useRouter();
    

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

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  setisAuthenticated(false);
  setisRole("");
  router.push("/homepage");
  
};

return {
    isAuthenticated,
    isRole, 
    logout,
};
}