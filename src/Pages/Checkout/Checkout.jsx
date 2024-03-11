import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    fetch(`https://bazaar-buzz.onrender.com/auth/userdata/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoadingUser(false);
      });
  }, []);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    zip_code: "",
    address_1: "",
    address_2: "",
  });

  useEffect(() => {
    if (!loadingUser && user && user.email) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: user.email,
      }));
    }
  }, [loadingUser, user]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      const response = await axios.post(
        "https://bazaar-buzz.onrender.com/pay/checkout/",
        formData
      );
      console.log("Checkout successful:", response.data);

      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        zip_code: "",
        address_1: "",
        address_2: "",
      });

      window.location.href = "/payment";
    } catch (error) {
      setError("Error during checkout:", error);
    }
    setLoading(false);
  };
  return (
    <div className="container my-5">
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        <div className="col-md-8 p-2">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    disabled
                    name="email"
                    placeholder={user.email}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="zip_code"
                    placeholder="Zip Code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="address_1"
                    placeholder="Address 1"
                    value={formData.address_1}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="address_2"
                    placeholder="Address 2"
                    value={formData.address_2}
                    onChange={handleChange}
                  />
                </div>

                <>
                  <button
                    className="btn btn-danger"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Proceed To Payment..." : "Proceed To Payment"}
                  </button>
                </>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4 p-2">
          <div className="card">
            <div className="card-body">
              {cartItems.map((item, index) => (
                <div key={index}>
                  <p>
                    {item.name} - ${item.price}
                  </p>
                </div>
              ))}
              <p>Subtotal: ${totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
