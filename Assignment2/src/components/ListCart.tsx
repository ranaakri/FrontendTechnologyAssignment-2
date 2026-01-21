import ProductCard from "./ProductCard";
import { useCartContext } from "../CartContext";

export default function ListCart() {
  const { cart } = useCartContext();

  return (
    <>
      {cart.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4 ">
          {cart?.map((item) => (
            <ProductCard item={item.item} key={item.item.id} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="font-semibold text-gray-500">
            {" "}
            -- No Items In Cart --{" "}
          </div>
        </div>
      )}
    </>
  );
}
