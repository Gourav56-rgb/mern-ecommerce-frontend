import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {

  const dispatch = useDispatch()

  const addToCartHandler = (cartItem:CartItem) => {
    if (cartItem.stock < 1) {
      return toast.error("Out of stock")
    }
    dispatch(addToCart(cartItem))
    toast.success(`${cartItem.name} added to cart`)
  };

  const { data, isError } = useLatestProductsQuery("");

  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>
      <main>
        {data?.products.map((product) => (
          <ProductCard
            key={product._id}
            productId={product._id}
            name={product.name}
            price={product.price}
            stock={product.stock}
            handler={addToCartHandler}
            photo={product.photo}
          />
        ))}
      </main>
    </div>
  );
};

export default Home;
