"use client"
import { useStore } from "@/stores/store";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Topbar() {
  const { toggleSidebarExpanded } = useStore();

  return (
    <div className="bg-white w-full px-5 py-3 flex items-center gap-5">
      <RxHamburgerMenu onClick={toggleSidebarExpanded} className="text-3xl cursor-pointer" />
      <input type="text" placeholder="Buscar" className="border border-gray rounded-md px-3 py-1" />
    </div>
  )
}
