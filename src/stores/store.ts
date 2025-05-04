import { Product, SaleItem } from "@/types";
import { create } from "zustand";
import axios from "axios";

interface StoreState {
  allProducts: Product[];
  setAllProducts: (products: Product[]) => void;

  allSaleItems: SaleItem[];
  setAllSaleItems: (saleItems: SaleItem[]) => void;

  getAllProducts: () => Promise<void>;
  getAllSaleItems: () => Promise<void>;
  addAllSaleItems: (saleItem: SaleItem) => Promise<void>;

  isSidebarExpanded: boolean;
  setIsSidebarExpanded: (expanded: boolean) => void;
  toggleSidebarExpanded: () => void;
}

export const useStore = create<StoreState>((set) => ({
  isSidebarExpanded: false,
  setIsSidebarExpanded: (expanded) => set({ isSidebarExpanded: expanded }),

  toggleSidebarExpanded: () => {
    set((state) => ({ isSidebarExpanded: !state.isSidebarExpanded }));
  },

  allProducts: [],
  setAllProducts: (products) => set({ allProducts: products }),
  getAllProducts: async () => {
    const { data } = await axios.get("http://localhost:8084/api/products");
    set({ allProducts: data });
  },

  allSaleItems: [],
  setAllSaleItems: (saleItems) => set({ allSaleItems: saleItems }),
  getAllSaleItems: async () => {
    const { data } = await axios.get("http://localhost:8084/api/sale-item");
    set({ allSaleItems: data });
  },

  addAllSaleItems: async (data: SaleItem) => {
    try {
      await axios.post("http://localhost:8084/api/sale-item", {
        quantity: data.quantity,
        totalPrice: data.totalPrice,
        dateSale: data.dateSale,
        product: {
          id: data.product,
        },
      });
    } catch (error) {
      console.error("Error adding sale item:", error);
      throw error;
    }
  },
}));
