"use client"

import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderMenu(){

    const router = useRouter();

    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const token = getCookie('accessToken');
        setAccessToken(token ? String(token) : null);
    }, []);

    const logout = () => {
        deleteCookie('accessToken');
        router.push('/');
        // 현재 로그아웃 API 미구현
    }

    return(
        <div className="flex gap-4">
            {!accessToken ?
                <>
                    <Link href="/login" className="border-r-2 border-sky-300 pr-[16px]">로그인</Link>
                    <Link href="/signup">회원가입</Link>
                </> :
                <>
                    <Link href="/mypage/purchase" className="border-r-2 border-sky-300 pr-[16px]">내 예약정보</Link>
                    <p onClick={logout}>로그아웃</p>
                </>
            }
        </div>
    )
}