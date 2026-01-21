import { useEffect, useState } from "react";
import ListProducts from "./components/ListProducts";
import { ThemeProvider, useTheme } from "./ContextProvider";
import { CartProvider } from "./CartContext";
import ListCart from "./components/ListCart";

export type Actions = "Items" | "Delete" | "Show Cart" | "Add" | "Toggle Theme";

function ThemeComponent() {
  return (
    <ThemeProvider>
      <ExtraComp />
    </ThemeProvider>
  );
}

export default ThemeComponent;

function ExtraComp() {
  const [action, setAction] = useState<Actions>("Items");
  const actions: Actions[] = ["Show Cart", "Items", "Toggle Theme"];
  const [catagoryList, setCatagoryList] = useState<string[]>([]);
  const [catagory, setCatagory] = useState<string>("All");

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((response) => response.json())
      .then((data) => setCatagoryList(data))
      .catch((error) => console.error("Error:", error));

  }, []);

  return (
    <>
      <div
        typeof="none"
        className={`flex flex-row px-4 py-1 font-semibold ${theme ? "bg-black text-white border-black" : "bg-green-500 text-black"} justify-center items-center"`}
      >
        {actions.map((val, index) =>
          val === "Toggle Theme" ? (
            <button
              className="hover:bg-white hover:text-black duration-300 rounded-md p-4"
              onClick={() => {
                setTheme((theme) => !theme);
              }}
              key={index}
            >
              {val}
            </button>
          ) : (
            <button
              className="hover:bg-white hover:text-black duration-300 rounded-md p-4"
              onClick={() => setAction(val)}
              key={index}
            >
              {val}
            </button>
          ),
        )}
      </div>
      <div className="flex justify-center items-center p-2 flex-col md:flex-row gap-4">
        <p>Catagory: </p>
        <select
          name="cars"
          id="cars"
          onChange={(e) => setCatagory(e.target.value)}
          required
          defaultValue={"All"}
        >
          <option value="All">All</option>
          {catagoryList.map((item) => (
            <option value={item} className="capitalize" key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <CartProvider>
        <Show action={action} type={catagory}></Show>
      </CartProvider>
    </>
  );
}

function Show({ action, type }: { action: Actions; type: string }) {

  switch (action) {
    case "Items":
      return <ListProducts type={type} />;
    case "Show Cart":
      return <ListCart />;
  }
}
