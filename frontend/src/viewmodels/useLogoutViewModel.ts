import { useState } from 'react'
import { useLoginViewModel } from './useLoginViewModel';

export const useLogoutViewModel = () => {

    const { logout } = useLoginViewModel();

    const[logoutOpen, setLogoutOpen]= useState(false);
    
        const handleLogoutOpen= ()=>{
            setLogoutOpen(true);
        }
        const handleLogoutClose= ()=>{
            setLogoutOpen(false);
        }
        const handleLogoutConfirm = async () => {
            await logout();
        }
    
  return{
    logoutOpen,
    handleLogoutOpen,
    handleLogoutClose,
    handleLogoutConfirm
  }
}

