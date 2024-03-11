import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
      // console.log(JSON.parse(storedCart));
    }
  }, []);

  // const removeFromCart = (index) => {
  //   const newCartItems = [...cartItems];
  //   newCartItems.splice(index, 1);
  //   setCartItems(newCartItems);
  //   updateLocalStorage(newCartItems);
  //   toast.success("Remove card product");
  // };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    const itemToRemove = newCartItems[index];

    if (itemToRemove.quantity > 1) {
      newCartItems[index].quantity -= 1;
    } else {
      newCartItems.splice(index, 1);
    }

    setCartItems(newCartItems);
    updateLocalStorage(newCartItems);
    toast.success("Product quantity updated in cart");
  };

  const updateLocalStorage = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  const { isLoggedIn } = useAuth();

  return (
    <div className="container my-5">
      <button type="button" className="btn ">
        <i className="bi bi-bag fs-5"></i>
        <span className=" mx-1">{cartItems.length}</span>
        Items
      </button>

      {cartItems?.length > 0 ? (
        <div>
          {cartItems.map((item, index) => (
            <div className="card mb-3" key={index}>
              <div className="card-body d-flex justify-content-evenly  ">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={item.image}
                      style={{ height: "auto" }}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="col-md-8">
                    <div>
                      <h5>{item.name}</h5>
                      <p>{item.description}</p>
                      <p> ${item.price}</p>
                      <h6>Quantity: {item.quantity}</h6>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoggedIn ? (
            <div>
              <Link to={"/checkout"}>
                <button className="btn btn-danger">
                  Checkout Now ${totalPrice}
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to={"/login/"}>
                <button className="btn btn-danger">
                  Please Login Then Checkout ${totalPrice}
                </button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="card mt-4">
          <div className="card-body text-center">
            <i className="bi bi-bag fs-5 text-danger fs-4"></i>
            <p>Your shopping bag is empty. Start shopping</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
