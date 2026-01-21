import { useTheme } from "../ContextProvider";
import type { Product } from "../interfaces/ProductInterface";
import { MdOutlineShoppingCart } from "react-icons/md";
interface Props {
  item: Product;
}
export default function ProductCard({ item }: Props) {
      const {theme} = useTheme();
  return (
    <div className="max-w-2xl border rounded-md shadow-md bg-green-500">
      <div className="flex items-center justify-center bg-white rounded-md">
        <img src={item.images[0]} className="w-48 h-48 object-cover" />
      </div>
      <div className="p-4 text-white rounded-md h-fit">
        <h2 className={"font-semibold" + theme ? "text-white" : "text-black"}>{item.title}</h2>
        <br />
        <hr />
        <p>Description: {item.description}</p>
        <hr />
        <br />
        <div className="grid grid-cols-2">
          <p>&#8377;{item.price}</p>
          {item.price > 500 && (
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
        <button className="flex flex-row justify-center items-center border border-blue-500 bg-blue-500 p-3 rounded-2xl mt-3">
          <MdOutlineShoppingCart /> Add To Cart
        </button>
      </div>
    </div>
  );
}
