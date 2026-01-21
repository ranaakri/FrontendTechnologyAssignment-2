import { useEffect, useState } from "react";
import { useTheme } from "../ContextProvider";
import type { Product } from "../interfaces/ProductInterface";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useCartContext } from "../CartContext";

interface Props {
  item: Product;
}

export default function ProductCard({ item }: Props) {
  const { theme } = useTheme();
  const { cart, setCart } = useCartContext();
  const [count, setCount] = useState(0);

  const [added, setAdded] = useState<boolean>(false);

  useEffect(() => {
    setAdded(cart.some((cartItem) => cartItem.item.id === item.id));
    const data = cart.find((c) => c.item.id === item.id);
    setCount(data ? data.count : 0);
  }, []);

  const handleAdd = () => {
    setCart((prev) =>
      prev.some((c) => c.item.id === item.id)
        ? prev
        : [...prev, { item, count: 1 }],
    );
    if (count == 0) setCount((prev) => prev + 1);
    setAdded(true);
  };

  const handleIncrement = () => {
    setCart((prev) =>
      prev
        .map((c) => (c.item.id === item.id ? { ...c, count: c.count + 1 } : c))
        .filter((c) => c.count > 0),
    );
    if (count < item.stock) setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCart((prev) =>
      prev
        .map((c) => (c.item.id === item.id ? { ...c, count: c.count - 1 } : c))
        .filter((c) => c.count > 0),
    );
    if (count > 0) setCount((prev) => prev - 1);
    if (count === 1) setAdded(false);
  };

  return (
    <div
      className={`max-w-2xl border rounded-md shadow-md  ${theme ? "bg-black text-white border-black" : "bg-green-500 text-black"}`}
    >
      <div className="flex items-center justify-center bg-white rounded-md">
        <img src={item.images[0]} className="w-48 h-48 object-cover" />
      </div>
      <div className="p-4 rounded-md h-fit">
        <h2 className={`font-semibold`}>{item.title}</h2>
        <br />
        <hr />
        <p>Description: {item.description}</p>
        <hr />
        <br />
        <div className="grid grid-cols-2">
          <p>&#8377;{item.price*84}</p>
          {(item.price*84) > 500 && (
            <p className="bg-yellow-300 text-black border rounded-full text-center">
              Expencive
            </p>
          )}
        </div>
        <p>Catagory: {item.category}</p>
        <div className="grid grid-cols-2">
          <p>Quentity: {item.stock}</p>
          {item.stock <= 5 && (
            <p className="bg-yellow-300 text-black border rounded-full text-center">
              Limited
            </p>
          )}
        </div>
        {!added ? (
          <button
            className="flex flex-row justify-center items-center border border-blue-500 bg-blue-500 p-3 rounded-2xl mt-3"
            onClick={handleAdd}
          >
            <MdOutlineShoppingCart /> Add To Cart
          </button>
        ) : (
          <div className="flex flex-row gap-4">
            <button
              className="flex flex-row justify-center items-center border border-gray-500 bg-white p-3 rounded-2xl mt-3 text-black"
              onClick={handleIncrement}
            >
              +
            </button>
            <div className="flex justify-center items-center">{count}</div>
            <button
              className="flex flex-row justify-center items-center border border-gray-500 bg-white p-3 rounded-2xl mt-3 text-black"
              onClick={handleDecrement}
            >
              -
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
