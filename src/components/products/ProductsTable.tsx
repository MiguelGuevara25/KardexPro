"use client";
import { productStore } from "@/stores/products";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

export default function ProductsTable() {
  const { deleteProduct, getAllProducts, allProducts } = productStore();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <>
      <button
        className="mb-5 bg-green-500 cursor-pointer text-white py-2 px-4 rounded-md"
        onClick={() => setOpenModal(true)}
      >
        Añadir producto
      </button>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Terms of Service</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </ModalFooter>
      </Modal>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>#</TableHeadCell>
            <TableHeadCell>Categoría</TableHeadCell>
            <TableHeadCell>Nombre</TableHeadCell>
            <TableHeadCell>Stock</TableHeadCell>
            <TableHeadCell>Precio Unitario</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only"></span>
            </TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody className="divide-y">
          {allProducts.map((product) => (
            <TableRow key={product?.id} className="bg-white">
              <TableCell className="text-gray-900">{product?.id}</TableCell>
              <TableCell className="text-gray-900">
                {product?.category?.name}
              </TableCell>

              <TableCell className="text-gray-900 font-bold">
                {product?.name}
              </TableCell>

              <TableCell className="text-gray-900">
                {product?.stock} UNI
              </TableCell>

              <TableCell className="text-gray-900">
                S/ {product?.price}
              </TableCell>

              <TableCell>
                <MdDelete
                  onClick={() => deleteProduct(product?.id)}
                  className="text-xl cursor-pointer text-red-500"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
