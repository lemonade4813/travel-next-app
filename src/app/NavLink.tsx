"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children, subMenu }: { href: string; children: any; subMenu?: { name: string, path: string }[] }) {

    const pathname = usePathname();

    return (
        <div className={`relative flex-1 h-[60px] pb-[4px] group ${pathname.includes(href) ? 'border-b-2 border-sky-700' : ''}`}>
            <Link href={href}
                className={`block w-full h-full text-center p-4 border-r-2 border-sky-400
                    ${pathname.includes(href) ? 'bg-sky-600 text-white' : 'bg-blue-200'}
                    hover:bg-blue-500 hover:text-white transition-colors duration-300`}
            >
                {children}
            </Link>
            {subMenu && (
                <div className="absolute top-full left-0 hidden w-full bg-white shadow-lg group-hover:block">
                    {subMenu.map((item) => (
                        <Link key={item.path} href={item.path} className="block p-4 bg-blue-300 hover:bg-blue-600 text-white">
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}