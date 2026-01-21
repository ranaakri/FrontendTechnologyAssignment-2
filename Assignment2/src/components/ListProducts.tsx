import { useEffect, useState } from "react";
import type { Product } from "../interfaces/ProductInterface";
import ProductCard from "./ProductCard";

export default function ListProducts({ type }: { type: string }) {
  const [products, setProducts] = useState<Product[]>();
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    try {
      if (type === "All") {
        fetch("https://dummyjson.com/products")
          .then((response) => response.json())
          .then((data) => setProducts(data.products))
          .catch((error) => console.error("Error:", error));
      } else {
        fetch("https://dummyjson.com/products/category/" + type)
          .then((response) => response.json())
          .then((data) => setProducts(data.products))
          .catch((error) => console.error("Error:", error));
      }
    } catch (error: any) {
      console.error(error);
    }
  }, [type]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/search?q=" + search)
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error:", error));
  }, [search]);

  return (
    <>
      <div className="flex justify-center items-center">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3"
          placeholder="Search"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4 ">
        {products?.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </>
  );
}
