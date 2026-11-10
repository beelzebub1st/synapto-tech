import { ProductsManager } from "@/components/dashboard/products-manager";
import { getLiveProducts } from "@/lib/dashboard-data";

export default async function ProductsPage() {
  const data = await getLiveProducts();
  return (
    <ProductsManager
      mode={data.mode}
      initialProducts={data.products.map((product) => ({
        id: product.id,
        title: product.title,
        category: product.category,
        price: product.price,
        inventory: product.inventory,
        status: product.status,
        availability: product.availability,
      }))}
    />
  );
}
