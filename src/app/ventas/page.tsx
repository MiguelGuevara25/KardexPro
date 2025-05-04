import SalesForm from "@/components/sale-item/SalesForm";
import SalesSumary from "@/components/sale-item/SalesSumary";
import SalesTable from "@/components/sale-item/SalesTable";

export default function HomeSales() {
  return (
    <>
      <h2 className="font-bold text-3xl mb-5">Ventas del día</h2>
      <section className="flex gap-8">
        <div className="flex flex-col gap-8 basis-3/4">
          <SalesForm />
          <SalesTable />
        </div>

        <SalesSumary />
      </section>
    </>
  );
}
