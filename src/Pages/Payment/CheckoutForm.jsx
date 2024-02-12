import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [transactionId, setTransactionId] = useState("");
  const [user, setUser] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    fetch(`https://bazaar-buzz.onrender.com/auth/userdata/${user_id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post("https://bazaar-buzz.onrender.com/pay/create-payment-intent/", {
        price: totalPrice,
      })
      .then((res) => {
        // console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [totalPrice]);

  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    //Confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email || "anonymous",
            name: user.username || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("Error");
    } else {
      console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setSuccess("Payment Successfully");
        console.log("transaction Id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        const payment = {
          email: user.email,
          price: totalPrice,
          transaction_id: paymentIntent.id,
          product_ids: cartItems.map((item) => item),
          date: new Date(),
          status: "pending",
        };
        try {
          const response = await axios.post(
            "https://bazaar-buzz.onrender.com/pay/payments/",
            payment
          );
          console.log("Payment created successfully:", response.data);
          // Optionally handle success response
        } catch (error) {
          console.error("Error creating payment:", error);
          // Optionally handle error
        }

        localStorage.removeItem("cart");
      }
    }
  };

  return (
    <div>
      <p className="text-danger">{error}</p>
      {transactionId && (
        <p className="text-success">Your Transaction Id: {transactionId}</p>
      )}
      {success && <p className="text-success ">{success}</p>}
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-outline-danger mt-3"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
