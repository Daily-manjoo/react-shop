import styles from "./main.module.css";
import { EventBanner } from "../eventBanner/eventBanner";
import { Product } from "../products/product";
import { useEffect } from "react";
import { getProducts } from "../../service/fetcher";

export const Main = ({ products, setProducts, convertPrice }) => {
  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.data.products);
    });
  }, [setProducts]); //8개 배열 setState에 담아서 가져오기

  return (
    <>
      <EventBanner />
      <div className={styles.filter}>
        <p>최신순</p>
        <p>낮은 가격</p>
        <p>높은 가격</p>
      </div>
      <main className={styles.flex_wrap}>
        {products.map((product) => {
          //배열 개수만큼 상품 보여주기
          return <Product key={`key-${product.id}`} product={product} convertPrice={convertPrice} />;
        })}
      </main>
    </>
  );
};
