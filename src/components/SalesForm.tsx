"use client";
import { productStore } from "@/stores/products";
import { useStore } from "@/stores/store";
import { Product, SaleItem } from "@/types";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SalesForm() {
  const { addAllSaleItems, getAllSaleItems } = useStore();
  const { getAllProducts, allProducts } = productStore();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const { register, setValue, handleSubmit, reset, watch } = useForm<
    SaleItem & Product
  >({
    defaultValues: {
      id: Number(""),
      price: 0,
      quantity: 1,
      stock: 0,
      totalPrice: 0,
    },
  });

  const getProductById = async (id: number) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8084/api/products/${id}`
      );
      setValue("price", data.price);
      setValue("stock", data.stock);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const price = watch("price");
  const quantity = watch("quantity");

  useEffect(() => {
    const total = parseFloat((price * quantity).toFixed(2));
    setValue("totalPrice", total);
  }, [quantity, price, setValue]);

  const onSubmit = async (data: SaleItem) => {
    try {
      await addAllSaleItems({
        ...data,
        dateSale: new Date().toISOString().split("T")[0],
      });
      reset();
      getAllSaleItems();
      alert("¡Venta agregada con éxito!");
    } catch (error) {
      console.error("Error adding sale item:", error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-10 [&>div>label]:font-medium">
        <div className="flex items-center gap-2">
          <label htmlFor="product">Producto: </label>
          <select
            {...register("product")}
            name="product"
            id="product"
            className="border border-gray bg-white rounded-md px-3 py-1 w-72"
            onChange={(e) => getProductById(Number(e.target.value))}
          >
            <option value="">Seleccionar producto</option>
            {allProducts.map(({ name, id }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="price">Precio Unitario: </label>
          <input
            {...register("price")}
            type="number"
            readOnly
            className="w-28 focus:outline-0 cursor-auto"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="quantity">Cantidad:</label>
          <input
            {...register("quantity")}
            type="number"
            className="border border-gray bg-white rounded-md px-3 py-1 w-24"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="stock">Stock:</label>
          <input
            {...register("stock")}
            type="number"
            readOnly
            className="w-28 focus:outline-0 cursor-auto"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="totalPrice">Precio Total:</label>
          <input
            {...register("totalPrice")}
            type="number"
            readOnly
            className="w-28 focus:outline-0 cursor-auto"
            step=".01"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-5">
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Agregar
        </button>
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
