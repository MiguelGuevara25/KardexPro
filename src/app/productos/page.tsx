import ProductsTable from "@/components/products/ProductsTable";

export default function HomeProducts() {
  return (
    <>
      <h2 className="font-bold text-3xl mb-5">Ventas del día</h2>
      <section>
        <ProductsTable />
      </section>
    </>
  )
}
