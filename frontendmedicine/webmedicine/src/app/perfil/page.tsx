'use client'

import { useAuth } from "@/hooks/useAuth";
import HeaderSemLogin, { HeaderComLogin } from "@/components/Header";

export default function Perfil (){
    const {isAuthenticated} = useAuth();
    return (
      <>
        <div>
        { isAuthenticated ? <HeaderComLogin/> : <HeaderSemLogin/>}         
        </div>        
      </>
    );
}