import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TopNavigationBar } from "./components/header/topNavigationBar/topNavigationBar";
import Home from "./pages/home";
import Product from "./pages/product";
import Basket from "./pages/basket";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]); //최상위 컴포넌트에서 만들어줌
  const [cart, setCart] = useState([]); //장바구니 만들 배열->장바구니는 detail에 있으므로 넣어줌
  const [checkLists, setCheckLists] = useState([]);
  const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //1000단위로 끊어주는 정규식
  };
  return (
    <BrowserRouter>
      <TopNavigationBar cart={cart} />
      <Routes>
        <Route path="/" element={<Home products={products} setProducts={setProducts} convertPrice={convertPrice} />} />
        <Route path="/product/:id" element={<Product convertPrice={convertPrice} cart={cart} setCart={setCart} />} />
        <Route
          path="/cart"
          element={<Basket cart={cart} setCart={setCart} convertPrice={convertPrice} checkLists={checkLists} setCheckLists={setCheckLists} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
