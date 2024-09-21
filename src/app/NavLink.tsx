"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children, subMenu }: { href: string; children: any; subMenu?: { name: string, path: string }[] }) {

    const pathname = usePathname();

    return (
        <div className={`relative flex-1 group ${(pathname === '/home' ||
                            pathname === '/login' ||
                            pathname === '/signup' ? 'hidden' : 'block')} 
                        `}
        >
            <Link href={href}
                className={`block w-full h-16 text-center p-3 text-white flex items-center justify-center
                    ${pathname.includes(href) ? 'bg-blue-700' : 'bg-blue-600'}
                    hover:bg-blue-500 transition-all duration-300 ease-in-out`}
            >
                {children}
        </Link>
            {subMenu && (
                <div className="absolute top-full left-0 hidden w-full bg-white shadow-lg group-hover:block z-50">
                    {subMenu.map((item) => (
                        <Link key={item.path} href={item.path} className="block p-4 text-blue-700 hover:bg-blue-100 transition-colors">
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}