import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    fetch(`https://bazaar-buzz.onrender.com/product/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [id]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    toast.success("Product added to cart!");
  };

  return (
    <div className="container my-5">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 p-5">
              <div>
                <img className="img-fluid" src={products.image} alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <h4>{products.name}</h4>
              <p>Category: {products.top_category}</p>
              <p>Brand: {products.sub_category}</p>
              <p>{products.description}</p>
              <h4 className="text-danger">${products.price}</h4>
              <span>Stock Available</span>
              <br />
              <br />
              <button
                onClick={() => addToCart(products)}
                className="btn btn-danger"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
