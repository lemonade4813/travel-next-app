"use client"

import Link from "next/link";

import { usePathname } from "next/navigation";


export default function NavLink({href, children} : any){

    const pathname = usePathname();

    return(
        <div className={`relative flex-1 ${pathname.includes(href) ? 'bg-yellow-600' : ''}`}>
            <Link href={href} className="block w-full h-full p-4 text-center">
                {children}
            </Link>
        </div>
    )




}