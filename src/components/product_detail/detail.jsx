import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./detail.module.css";
import { getProducts } from "../../service/fetcher";

export const Detail = ({ convertPrice, cart, setCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);

  const handleQuantity = (type) => {
    if (type === "plus") {
      setCount(count + 1);
    } else {
      if (count === 1) return;
      setCount(count - 1);
    }
  };

  useEffect(() => {
    getProducts().then((data) => {
      setProduct(data.data.products.find((product) => product.id === parseInt(id))); //아이디값이 스트링이라 변환
    });
  }, [id]);

  // 장바구니 중복된 물건 확인
  const setQuantity = (id, quantity) => {
    const found = cart.filter((el) => el.id === id)[0]; //중복값은 하나만 들어오니까
    const idx = cart.indexOf(found);
    const cartItem = {
      //불러들일 정보
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      provider: product.provider,
      quantity: quantity, //매개변수의 quantity
    };
    setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
  };

  const handleCart = () => {
    //선택한 물품이 장바구니 안에 들어가도록
    const cartItem = {
      //불러들일 정보
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      provider: product.provider,
      quantity: count,
    };
    const found = cart.find((el) => el.id === cartItem.id); //카트의 값들 중에서 중복된 물건이 있는지

    if (found) setQuantity(cartItem.id, found.quantity + count);
    else setCart([...cart, cartItem]); //스프레드로 cart안에 여러개의 정보를 담을 수 있도록
  };

  console.log(cart);

  return (
    product && ( //프로덕트가 들어와야 아래 코드가 렌더링되도록
      <>
        <main className={styles.main}>
          <section className={styles.product}>
            <div className={styles.product_img}>
              <img src={product.image} alt="product" />
            </div>
          </section>
          <section className={styles.product}>
            <div className={styles.product_info}>
              <p className={styles.seller_store}>{product.provider}</p>
              <p className={styles.product_name}>{product.name}</p>
              <span className={styles.price}>
                {convertPrice(product.price + "")}{" "}
                {/*브라우저 렌더링 과정에서 getProducts의 비동기처리를 못기다림-> product를 빈 객체로 인식했기
              때문에 string으로 바꿔준다*/}
                <span className={styles.unit}>원</span>
              </span>
            </div>

            <div className={styles.delivery}>
              <p>택배배송 / 무료배송</p>
            </div>

            <div className={styles.line}></div>

            <div className={styles.amount}>
              <img className={styles.minus} src="/images/icon-minus-line.svg" alt="minus" onClick={() => handleQuantity("minus")} />

              <div className={styles.count}>
                <span>{count}</span>
              </div>

              <img className={styles.plus} src="/images/icon-plus-line.svg" alt="plus" onClick={() => handleQuantity("plus")} />
            </div>

            <div className={styles.line}></div>

            <div className={styles.sum}>
              <div>
                <span className={styles.sum_price}>총 상품 금액</span>
              </div>

              <div className={styles.total_info}>
                <span className={styles.total}>
                  총 수량 <span className={styles.total_count}>{count}개</span>
                </span>
                <span className={styles.total_price}>
                  {convertPrice(product.price * count)}
                  <span className={styles.total_unit}>원</span>
                </span>
              </div>
            </div>

            <div className={styles.btn}>
              <button className={styles.btn_buy}>바로 구매</button>
              <button className={styles.btn_cart} onClick={() => handleCart()}>
                장바구니
              </button>
            </div>
          </section>
        </main>
      </>
    )
  );
};
