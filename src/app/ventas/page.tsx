import SalesForm from "@/components/SalesForm";
import SalesSumary from "@/components/SalesSumary";
import SalesTable from "@/components/SalesTable";

export default function HomeSales() {
  return (
    <div>
      <h2 className="font-bold text-3xl mb-5">Ventas del día</h2>
      <section className="flex gap-8">
        <div className="flex flex-col gap-8 basis-3/4">
          <SalesForm />
          <SalesTable />
        </div>

        <SalesSumary />
      </section>
    </div>
  );
}
