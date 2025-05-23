import { create } from "zustand";
import axios from "axios";
import { SaleItem } from "@/types";

interface SaleItemState {
  allSaleItems: SaleItem[];
  setAllSaleItems: (saleItems: SaleItem[]) => void;

  getAllSaleItems: () => Promise<void>;
  addAllSaleItems: (saleItem: SaleItem) => Promise<void>;
  deleteSaleItem: (id: number) => Promise<void>;
}

export const saleItemStore = create<SaleItemState>((set) => ({
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

  deleteSaleItem: async (id: number) => {
    try {
      await axios.delete(`http://localhost:8084/api/sale-item/${id}`);
      set((state) => ({
        allSaleItems: state.allSaleItems.filter(
          (saleItem) => saleItem.id !== id
        ),
      }));
    } catch (error) {
      console.error("Error deleting sale item:", error);
      throw error;
    }
  },
}));
