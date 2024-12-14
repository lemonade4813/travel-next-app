"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useLogin } from "@/util/components/context/LoginContext";
import { deleteCookie } from "cookies-next";

export default function HeaderMenu() {
    const { isLoggedIn, setIsLoggedIn } = useLogin();
    const router = useRouter();

    const handleLogout = () => {
        deleteCookie('accessToken');
        setIsLoggedIn(false);
        router.push('/');
    };

    return (
        <nav className="flex gap-4">
            {!isLoggedIn ? (
                <>
                    <Link href="/login" className="border-r-2 border-sky-300 pr-[16px]">로그인</Link>
                    <Link href="/signup">회원가입</Link>
                </>
            ) : (
                <>
                    <Link href="/mypage/reservation" className="border-r-2 border-sky-300 pr-[16px]">내 예약정보</Link>
                    <button onClick={handleLogout}>로그아웃</button>
                </>
            )}
        </nav>
    );
}