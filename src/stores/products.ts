import { create } from "zustand";
import axios from "axios";
import { Product } from "@/types";

interface ProductState {
  allProducts: Product[];
  setAllProducts: (products: Product[]) => void;
  getAllProducts: () => Promise<void>;
}

export const productStore = create<ProductState>((set) => ({
  allProducts: [],
  setAllProducts: (products) => set({ allProducts: products }),
  
  getAllProducts: async () => {
    const { data } = await axios.get("http://localhost:8084/api/products");
    set({ allProducts: data });
  },
}));
