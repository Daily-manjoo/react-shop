import styles from "./cart.module.css";
import { CartHeader } from "./cartHeader";
import { CartList } from "./cartList";
import { TotalCart } from "./totalCart";

export const Cart = ({ cart, setCart, convertPrice, checkLists, setCheckLists }) => {
  const handleQuantity = (type, id, quantity) => {
    //수량조절, 변수: type= +,- 증가 감소
    const found = cart.filter((el) => el.id === id)[0];
    const idx = cart.indexOf(found);
    const cartItem = {
      id: found.id,
      image: found.image,
      name: found.name,
      price: found.price,
      quantity: quantity,
      provider: found.provider,
    };
    if (type === "plus") {
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
    } else {
      if (quantity === 0) return;
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
    }
  };
  const handleRemove = (id) => {
    //장바구니 물품 삭제
    setCart(cart.filter((el) => el.id !== id));
  };

  const handleCheckList = (checked, id) => {
    //체크리스트에 id값을 부여하고 체크된것만 리스트에 넣기
    if (checked) {
      setCheckLists([...checkLists, id]);
    } else {
      setCheckLists(checkLists.map((check) => check !== id));
    }
  };
  console.log(checkLists);
  return (
    <>
      <header className={styles.header}>
        <h1>장바구니</h1>
      </header>
      <CartHeader />
      {cart.length === 0 ? (
        <div className={styles.not}>
          <h2>장바구니에 담긴 상품이 없습니다.</h2>
          <p>원하는 상품을 담아주세요.</p>
        </div>
      ) : (
        cart.map((cart) => {
          return (
            <CartList
              key={`key-${cart.id}`}
              cart={cart}
              setCart={setCart}
              convertPrice={convertPrice}
              handleQuantity={handleQuantity}
              handleRemove={handleRemove}
              handleCheckList={handleCheckList}
              checkLists={checkLists}
            />
          );
        })
      )}
      {cart.length === 0 ? "" : <TotalCart />}
    </>
  );
};
