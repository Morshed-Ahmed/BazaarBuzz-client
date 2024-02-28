import Slider from "react-slick";
import "./FlashDeals.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const FlashDeals = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://bazaar-buzz.onrender.com/product/products/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    toast.success("Product added to cart!");
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="my-5">
      <div>
        <h4> Flash Deals </h4>
        {loading && (
          <>
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </>
        )}
        <Slider {...settings} className="m-3">
          {products.map((product) => (
            <div key={product.id}>
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
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FlashDeals;
