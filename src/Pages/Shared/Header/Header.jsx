import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import toast from "react-hot-toast";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://bazaar-buzz.onrender.com/category/topcategories/")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const [cartItems, setCartItems] = useState([]);

  // Load cart items from local storage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  // const handleLogout = async () => {
  //   try {
  //     const tt = localStorage.getItem("token");
  //     const response = await fetch("https://bazaar-buzz.onrender.com/auth/logout/", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Token ${tt}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Logout failed");
  //     }
  //     localStorage.removeItem("token");
  //     setToken(null);
  //     setIsLoggedIn(false);
  //     console.log("Logged out");
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   }
  // };
  const handlelogOut = () => {
    const token = localStorage.getItem("token");

    fetch("https://bazaar-buzz.onrender.com/auth/logout/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Logout successful");
      });
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
  };

  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // console.log("Search value:", searchValue);
      fetch(
        `https://bazaar-buzz.onrender.com/product/products/?search=${searchValue}`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    }
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-light">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          <i className="bi bi-bank2 me-1"></i>
          BazaarBuzz
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-center">
            <div className="w-75 mt-3">
              <div className="d-flex w-80" role="search">
                <div className="input-group mb-3">
                  <span
                    className="input-group-text rounded-start-pill"
                    id="basic-addon1"
                  >
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    value={searchValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    type="text"
                    className="form-control"
                    aria-label="Text input with dropdown button"
                    placeholder="Searching for..."
                  />

                  <button
                    className="btn btn-outline-secondary dropdown-toggle rounded-end-pill"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All Categories
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    {categories.map((category) => (
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/allProducts/${category.name}`}
                        key={category.id}
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            {category.name}
                          </a>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{}}>
                <div style={{}}>
                  <ol className="list-group list-group-numbered">
                    {data.map((product) => (
                      <li key={product.id} className="list-group-item">
                        <Link
                          style={{ textDecoration: "none" }}
                          className="text-dark"
                          to={`/products/${product.id}`}
                        >
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </ul>
          <div className="d-flex align-items-center">
            <Link
              className="btn rounded text-dark"
              style={{ backgroundColor: "#E9ECEF", textDecoration: "none" }}
              to={`/allProducts/${"All"}`}
            >
              All Products
            </Link>
            <Link to={"cart"}>
              <button
                type="button"
                className="btn btn-light rounded-circle position-relative"
              >
                <i className="bi bi-bag fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </button>
            </Link>
            {isLoggedIn ? (
              <div className="d-flex ">
                <Link to={"/profile"}>
                  <button
                    type="button"
                    className="btn btn-light rounded-circle"
                  >
                    <i className="bi bi-person fs-4"></i>
                  </button>
                </Link>

                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={handlelogOut}
                >
                  <i className="bi bi-box-arrow-right"></i>
                </Button>
              </div>
            ) : (
              <div>
                <Link to={"/login"}>
                  <button
                    type="button"
                    className="btn btn-light rounded-circle"
                  >
                    <i className="bi bi-person fs-4"></i>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
