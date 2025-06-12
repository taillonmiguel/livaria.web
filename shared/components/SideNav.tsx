"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBook, FaTag, FaUser, FaHome } from "react-icons/fa";

export function SideNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Início", icon: FaHome },
    { href: "/livros", label: "Livros", icon: FaBook },
    { href: "/generos", label: "Gêneros", icon: FaTag },
    { href: "/autores", label: "Autores", icon: FaUser },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="w-[200px] min-h-screen bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-cyan-500">Livraria</h2>
      </div>

      <div className="py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors
                ${
                  active
                    ? "bg-cyan-50 text-cyan-600 border-l-4 border-cyan-500"
                    : ""
                }
              `}
            >
              <Icon
                className={`mr-3 ${active ? "text-cyan-500" : "text-gray-500"}`}
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
