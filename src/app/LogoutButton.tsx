"use client"

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function LogoutButton () {
    
    const router = useRouter();
    
    const logout = () => {
        deleteCookie('accessToken');
        router.push('/');
        // 현재 로그아웃 API 미구현
    }
    return(
        <button onClick={logout}>로그아웃</button>
    )
}