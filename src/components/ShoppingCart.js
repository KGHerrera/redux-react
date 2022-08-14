import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, delToCart } from "../actions/shoppingActions";
import CartItem from "./CartItem";
import ProductItem from "./ProductItem";

export default function ShoppingCart() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { products, cart } = state.shopping;

  return (
    <div>
      <h2>carrito de compras</h2>
      <h3>productos</h3>
      <article className="box grid-responsive">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            data={product}
            addToCart={() => dispatch(addToCart(product.id))}
          />
        ))}
      </article>
      <h3>carrito</h3>
      <article className="box">
        <button onClick={() => dispatch(clearCart())}>limpiar carrito</button>
        {cart.map((item, index) => (
          <CartItem
            key={index}
            data={item}
            delOneFromCart={() => dispatch(delToCart(item.id))}
            delAllFromCart={() => dispatch(delToCart(item.id, true))}
          />
        ))}
      </article>
    </div>
  );
}
