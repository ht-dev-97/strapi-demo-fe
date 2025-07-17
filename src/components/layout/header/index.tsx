import { LIST_MENU } from "@/constants";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/">
          <h1 className="text-blue-500 text-2xl font-bold">Strapi</h1>
        </Link>
        <nav>
          <ul className="flex gap-4">
            {LIST_MENU.map((menu) => (
              <li
                key={menu.name}
                className="text-gray-500 hover:text-gray-700 font-medium"
              >
                <Link href={menu.href}>{menu.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
