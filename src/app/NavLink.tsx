"use client"

import Link from "next/link";

import { usePathname } from "next/navigation";


export default function NavLink({href, children} : any){

    const pathname = usePathname();

    return(
        <div className={`relative flex-1 bg-blue-200 h-[60px]`}>
            <Link href={href} 
                  className={`block w-full h-full p-4 text-center
                              ${pathname.includes(href) ? 
                                'bg-sky-600 text-white border-b-2 border-sky-700' 
                             : ''}
                    `}
            >
                {children}
            </Link>
        </div>
    )




}