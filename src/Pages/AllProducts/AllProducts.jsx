import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useAuth();

  const [kk, setKk] = useState("");

  const { name } = useParams();

  //TOP CATEGORIES
  const [topCategories, setTopCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // ACTIVE COLOR
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
    setActiveCategory(null);
    setActiveSubCategory(null);
    setKk("All");
  };

  useEffect(() => {
    setLoading(true);
    fetch("https://bazaar-buzz.onrender.com/category/topcategories/")
      .then((response) => response.json())
      .then((data) => {
        setTopCategories(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("https://bazaar-buzz.onrender.com/category/subcategories/")
      .then((response) => response.json())
      .then((data) => {
        setSubCategories(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleFilterTopCategory = (topCategory) => {
    setActiveCategory(topCategory.id);
    setActiveSubCategory(null);

    fetch(
      `https://bazaar-buzz.onrender.com/category/subcategories/?search=${topCategory.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSubCategories(data);
      });

    setKk(topCategory.name);
    setLoading(true);
    fetch(
      `https://bazaar-buzz.onrender.com/product/products/?top_category=${topCategory.name}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleFilterSobCategory = (subCategory) => {
    setActiveSubCategory(subCategory.name);
    setKk(subCategory.name);
    setLoading(true);
    fetch(
      `https://bazaar-buzz.onrender.com/product/products/?sub_category=${subCategory.name}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://bazaar-buzz.onrender.com/product/products/?top_category=${name}&price=${priceFilter}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [name, priceFilter]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // const addToCart = (product) => {
  //   setCartItems([...cartItems, product]);
  //   // alert("Product added to cart!");
  //   toast.success("Product added to cart!");
  // };

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
    <div style={{ backgroundColor: "#F6F9FC" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Categories</h5>
                {topCategories.map((category) => (
                  <div key={category.id}>
                    <h6
                      style={{ cursor: "pointer" }}
                      className={`text-${
                        activeCategory === category.id ? "primary" : "secondary"
                      }`}
                      onClick={() => handleFilterTopCategory(category)}
                    >
                      {category.name}
                    </h6>
                  </div>
                ))}
                <h5 className="card-title">Brands</h5>
                {subCategories.map((category) => (
                  <div key={category.id}>
                    <h6
                      style={{ cursor: "pointer" }}
                      className={`text-${
                        activeSubCategory === category.name
                          ? "primary"
                          : "secondary"
                      }`}
                      onClick={() => handleFilterSobCategory(category)}
                    >
                      {category.name}
                    </h6>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <h6>Searching for “ {kk} ”</h6>
                  <h6 className="text-secondary">
                    {products.length} results found
                  </h6>
                </div>
                <div>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={priceFilter}
                    onChange={handlePriceFilterChange}
                  >
                    <option selected value="">
                      Select Price Filter
                    </option>
                    <option value="low_to_high">Low to High</option>
                    <option value="high_to_low">High to Low</option>
                  </select>
                </div>
              </div>
            </div>
            {loading ? (
              <>
                <div className="spinner-grow" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              <>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {products.map((product) => (
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

                                  {isLoggedIn ? (
                                    <>
                                      <i
                                        role="button"
                                        onClick={() => addToCart(product)}
                                        className="bi bi-plus-square fs-5 text-danger btn add-to-cart-icon"
                                      ></i>
                                    </>
                                  ) : (
                                    <Link to={"/login"}>
                                      <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                          <Tooltip id={`tooltip-bottom`}>
                                            Please Login.
                                          </Tooltip>
                                        }
                                      >
                                        <i
                                          role="button"
                                          className="bi bi-plus-square fs-5 text-danger btn add-to-cart-icon"
                                        ></i>
                                      </OverlayTrigger>
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
