"use client";
import { saleItemStore } from "@/stores/saleItem";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";

export default function SalesTable() {
  const { getAllSaleItems, allSaleItems, deleteSaleItem } = saleItemStore();

  useEffect(() => {
    getAllSaleItems();
  }, [getAllSaleItems]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>#</TableHeadCell>
          <TableHeadCell>Categoría</TableHeadCell>
          <TableHeadCell>Nombre</TableHeadCell>
          <TableHeadCell>Cantidad</TableHeadCell>
          <TableHeadCell>Precio</TableHeadCell>
          <TableHeadCell>Total</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only"></span>
          </TableHeadCell>
        </TableRow>
      </TableHead>

      <TableBody className="divide-y">
        {allSaleItems.map((item) => (
          <TableRow key={item?.id} className="bg-white">
            <TableCell className="text-gray-900">{item?.product.id}</TableCell>
            <TableCell className="text-gray-900">
              {item?.product?.category?.name}
            </TableCell>
            <TableCell className="text-gray-900 font-bold">
              {item?.product?.name}
            </TableCell>
            <TableCell className="text-gray-900">
              {item?.quantity} UNI
            </TableCell>
            <TableCell className="text-gray-900">
              S/ {item?.product?.price}
            </TableCell>
            <TableCell className="text-gray-900">
              S/ {item?.totalPrice}
            </TableCell>
            <TableCell>
              <MdDelete
                onClick={() => deleteSaleItem(item?.id)}
                className="text-xl cursor-pointer text-red-500"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
