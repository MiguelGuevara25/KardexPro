"use client";
import { saleItemStore } from "@/stores/saleItem";

export default function SalesSumary() {
  const { allSaleItems } = saleItemStore();

  const total = allSaleItems.reduce(
    (sum, item) => sum + (item.totalPrice || 0),
    0
  );

  return (
    <div className="basis-1/4">
      <div className="bg-white p-5 space-y-3 rounded-lg shadow-md">
        <h2 className="font-bold text-xl">Resumen</h2>
        <p>Productos a comprar</p>
        <div>
          <div className="flex font-bold border-b-2 border-gray-300 pb-2 mb-2">
            <p className="flex-1">Producto</p>
            <p className="flex-1 text-center">Cantidad</p>
            <p className="flex-1 text-end">Precio</p>
          </div>

          {allSaleItems.map((e) => {
            return (
              <div key={e?.id} className="flex">
                <p className="flex-1">{e?.product?.name}</p>
                <p className="flex-1 text-center">x{e?.quantity}</p>
                <p className="flex-1 text-end">S/ {e?.totalPrice}</p>
              </div>
            );
          })}

          <div className="flex justify-between font-bold border-t-2 border-gray-300 pt-2 mt-2">
            <p>Total a pagar</p>
            <p>S/ {total.toFixed(2)}</p>
          </div>

          <div className="flex justify-between font-bold border-t-2 border-gray-300 pt-2 mt-2">
            <p>Pago de cliente</p>
            <input type="text" className="w-24 text-end focus:outline-0" />
          </div>

          <div className="flex justify-between font-bold border-t-2 border-gray-300 pt-2 mt-2">
            <p>Cambio</p>
            <p>S/ 320.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
