import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState("");
  const [payProducts, setPayProducts] = useState([]);
  // const [payProductsItem, setPayProductsItem] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    fetch(`https://bazaar-buzz.onrender.com/auth/userdata/${user_id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  useEffect(() => {
    fetch(`https://bazaar-buzz.onrender.com/pay/payments/?search=${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        setPayProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [user.email]);

  // useEffect(() => {
  //   payProducts.map((i) => setPayProductsItem(i.product_ids));
  // }, [payProducts]);

  return (
    <div className="container my-5">
      <div className="card mb-3">
        <div className="card-body">
          <h4>Personal Information</h4>
          <h5>Username</h5>
          <p>
            {user.first_name} {user.last_name}
          </p>
          <h5>Email</h5>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h4>Order Lists</h4>
          {payProducts.map((i) => (
            <div className="card" key={i.id}>
              <div className="card-body">
                <h6>Transaction Id: {i.transaction_id}</h6>
                <p>{i.price}</p>
                <span>{i.date}</span>

                {/* {payProductsItem.map((l, index) => (
                  <div key={index}>
                    <p>{l.name}</p>
                  </div>
                ))} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
