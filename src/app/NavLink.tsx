"use client"

import Link from "next/link";

import { usePathname } from "next/navigation";


export default function NavLink({href, children} : any){

    const pathname = usePathname();

    return(
        <div className={`relative flex-1 h-[60px] pb-[4px] 
                         ${pathname.includes(href) ? 'border-b-2 border-sky-700' : ''}`}>
            <Link href={href} 
                  className={`block w-full h-full text-center 
                               p-4
                              ${pathname.includes(href) ? 
                                'bg-sky-600 text-white'
                             : 'bg-blue-200'}
                    `}
            >
                {children}
            </Link>
        </div>
    )




}