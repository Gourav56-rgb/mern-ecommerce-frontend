import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem:CartItem) => void
  decrementHandler: (cartItem:CartItem) => void
  removeHandler: (id:string, cartItem:CartItem) => void
};

const CartItemCard = ({ cartItem, incrementHandler, decrementHandler, removeHandler }: CartItemProps) => {
  const { productId, photo, name, price, quantity } = cartItem;
  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>{price}</span>
      </article>
      <div>
        <button disabled={cartItem.quantity <= 1} onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button disabled={cartItem.quantity >= cartItem.stock} onClick={() => incrementHandler(cartItem)}>+</button>
      </div>
      <button onClick={() => removeHandler(productId,cartItem)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItemCard;
