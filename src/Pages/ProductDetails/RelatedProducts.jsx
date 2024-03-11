import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const RelatedProducts = ({ products }) => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetch(
      `https://bazaar-buzz.onrender.com/product/products/?top_category=${products.top_category}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDatas(data);
      });
  }, [products.top_category]);

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingProductIndex].quantity += 1;
      setCartItems(updatedCart);
      toast.success("Product quantity increased in cart!");
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      toast.success("Product added to cart!");
    }
  };
  return (
    <div className="py-5">
      <h5>Related Products</h5>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {datas.map((product) => (
          <div className="col" key={product.id}>
            <div>
              <div className="p-1">
                <div>
                  <div id="card-flyer" className="card">
                    <div id="image-box" className="">
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.name}
                      />
                    </div>

                    <div className="card-body">
                      <Link to={`/products/${product.id}`}>
                        <h5 id="ss" className="card-title fs-6">
                          {product.name}
                        </h5>
                      </Link>

                      <div className="d-flex">
                        <i className="bi bi-star text-warning"></i>
                        <i className="bi bi-star text-warning"></i>
                        <i className="bi bi-star text-warning"></i>
                        <i className="bi bi-star text-warning"></i>
                        <i className="bi bi-star text-warning"></i>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="card-text text-danger">
                          $ {product.price}
                        </p>

                        <i
                          onClick={() => addToCart(product)}
                          className="bi bi-plus-square fs-5 text-danger btn "
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
