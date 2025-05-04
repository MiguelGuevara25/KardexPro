import { create } from "zustand";
import axios from "axios";
import { Product } from "@/types";

interface ProductState {
  allProducts: Product[];
  setAllProducts: (products: Product[]) => void;
  getAllProducts: () => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const productStore = create<ProductState>((set) => ({
  allProducts: [],
  setAllProducts: (products) => set({ allProducts: products }),

  getAllProducts: async () => {
    try {
      const { data } = await axios.get("http://localhost:8084/api/products");
      set({ allProducts: data });
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  },

  deleteProduct: async (id: number) => {
    try {
      await axios.delete(`http://localhost:8084/api/products/${id}`);

      set((state) => ({
        allProducts: state.allProducts.filter((product) => product.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },
}));
