import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

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
      });
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
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
                <form className="d-flex w-80" role="search">
                  <div className="input-group mb-3">
                    <span
                      className="input-group-text rounded-start-pill"
                      id="basic-addon1"
                    >
                      <i className="bi bi-search"></i>
                    </span>
                    <input
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
                        <li key={category.id}>
                          <a className="dropdown-item" href="#">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </form>
              </div>
            </ul>
            <div className="d-flex align-items-center">
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
    </div>
  );
};

export default Header;
