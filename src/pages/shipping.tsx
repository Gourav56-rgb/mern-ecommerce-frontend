import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { cartReducerInitialState } from "../types/reducer-types";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shipping = () => {

  const { cartItems, total } =
    useSelector(
      (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
    );

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
 
  useEffect(() => {
    if (cartItems.length <= 0) {
      return navigate("/cart")
    }
  }, [cartItems])

  const submitHandler = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(saveShippingInfo(shippingInfo))

    try {
      const {data} = await axios.post(`${server}/api/v1/payment/create`, {
        amount: total
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      navigate("/pay", {
        state: data.clientSecret
      })
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="shipping">
      <button className="back-btn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>
      <form onSubmit={submitHandler}>
        <h1>Shipping Address</h1>
        <input
          type="text"
          required
          placeholder="Address"
          value={shippingInfo.address}
          name="address"
          onChange={changeHandler}
        />
        <input
          type="text"
          required
          placeholder="City"
          value={shippingInfo.city}
          name="city"
          onChange={changeHandler}
        />
        <input
          type="text"
          required
          placeholder="State"
          value={shippingInfo.state}
          name="state"
          onChange={changeHandler}
        />

        <select
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
        >
          <option value="">Select Country</option>
          <option value="india">India</option>
        </select>
        <input
          type="number"
          required
          placeholder="PinCode"
          value={shippingInfo.pinCode}
          name="pinCode"
          onChange={changeHandler}
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;
