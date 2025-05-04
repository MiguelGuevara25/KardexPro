"use client";
import { useStore } from "@/stores/store";
import { FaBoxOpen } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { MdSell } from "react-icons/md";
import { FcHome } from "react-icons/fc";
import Link from "next/link";

export default function Sidebar() {
  const { isSidebarExpanded } = useStore();

  const data = [
    { id: 1, link: "/productos", name: "Productos", icon: <FaBoxOpen /> },
    {
      id: 2,
      link: "/categorias",
      name: "Categorías",
      icon: <BiSolidCategory />,
    },
    { id: 3, link: "/ventas", name: "Ventas", icon: <MdSell /> },
  ];

  return (
    <aside
      className={`bg-primary h-screen ${
        isSidebarExpanded ? "w-1/14" : "w-20"
      } transition-all duration-300 ease-in-out text-white pt-5 flex items-center flex-col gap-10`}
    >
      {isSidebarExpanded ? (
        <h1 className="text-2xl font-light">
          <Link href="/">
            Kardex<span className="font-bold">Pro</span>
          </Link>
        </h1>
      ) : (
        <Link href="/">
          <FcHome className="text-4xl"/>
        </Link>
      )}

      <nav>
        <ul className="flex flex-col gap-5">
          {data.map((item) => (
            <li key={item.id}>
              <Link
                className="flex items-center gap-1 flex-col"
                href={item.link}
              >
                {item.icon && (
                  <div className="bg-white text-primary rounded-full p-2 flex items-center justify-center">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                )}
                {isSidebarExpanded && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
