import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { name } = useParams();

  //TOP CATEGORIES
  const [topCategories, setTopCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

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

  const [kk, setKk] = useState("");

  const handleFilterTopCategory = (topCategory) => {
    setKk(topCategory);
    setLoading(true);
    fetch(
      `https://bazaar-buzz.onrender.com/product/products/?top_category=${topCategory}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleFilterSobCategory = (subCategory) => {
    setKk(subCategory);
    setLoading(true);
    fetch(
      `https://bazaar-buzz.onrender.com/product/products/?sub_category=${subCategory}`
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
      `https://bazaar-buzz.onrender.com/product/products/?top_category=${name}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [name]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    alert("Product added to cart!");
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
                      className="text-secondary"
                      onClick={() => handleFilterTopCategory(category.name)}
                    >
                      {category.name}
                    </h6>
                  </div>
                ))}
                <h5 className="card-title">Categories Brand</h5>
                {subCategories.map((category) => (
                  <div key={category.id}>
                    <h6
                      style={{ cursor: "pointer" }}
                      className="text-secondary"
                      onClick={() => handleFilterSobCategory(category.name)}
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
              <div className="card-body">
                <h6>Searching for “ {kk} ”</h6>
                <h6 className="text-secondary">
                  {products.length} results found
                </h6>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
