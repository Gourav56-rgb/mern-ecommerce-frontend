import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItemCard from "../components/cart-item";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import {
  addToCart,
  calculatePrice,
  discountApply,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../redux/store";

const Cart = () => {
  const { cartItems, subtotal, shippingCharges, tax, total, discount } =
    useSelector(
      (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
    );

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
  const dispatch = useDispatch();

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) {
      return;
    }
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
    toast.success(
      `You have increased ${cartItem.name} quantity to ${cartItem.quantity + 1}`
    );
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) {
      return;
    }
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    toast.success(
      `You have decreased ${cartItem.name} quantity to ${cartItem.quantity - 1}`
    );
  };

  const removeHandler = (productId: string, cartItem: CartItem) => {
    dispatch(removeCartItem(productId));
    toast.success(`${cartItem.name} removed from cart`);
  };

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`)
        .then((res) => {
          dispatch(discountApply(res.data.discount))
          dispatch(calculatePrice())
          setIsValidCouponCode(true);
        })
        .catch(() => {
          dispatch(discountApply(0))
          dispatch(calculatePrice())
          setIsValidCouponCode(false);
        });
    }, 1000);
    return () => {
      clearTimeout(timeOutID);
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItemCard
              key={idx}
              cartItem={i}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
            />
          ))
        ) : (
          <h1>Your cart is empty</h1>
        )}
      </main>
      <aside>
        {cartItems.length < 1 ? (
          <h1></h1>
        ) : (
          <>
            <p>Subtotal: ₹{subtotal}</p>
            <p>Shipping Charges: ₹{shippingCharges}</p>
            <p>Tax: ₹{tax}</p>
            <p>
              Discount: <em className="red"> - ₹{discount}</em>
            </p>
            <p>
              <b>Total: ₹{total}</b>
            </p>
            <input
              type="text"
              value={couponCode}
              placeholder="Coupon code"
              onChange={(e) => setCouponCode(e.target.value)}
            />
            {couponCode &&
              (isValidCouponCode ? (
                <span className="green">
                  ₹{discount} off using the <code>{couponCode}</code>
                </span>
              ) : (
                <span className="red">
                  Invalid Coupon <VscError />{" "}
                </span>
              ))}
            {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
          </>
        )}
      </aside>
    </div>
  );
};

export default Cart;
