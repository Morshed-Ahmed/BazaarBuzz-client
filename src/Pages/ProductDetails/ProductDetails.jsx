// import { useEffect, useState } from "react";
// import { Alert, Button, Col, Form, ListGroup, Row, Tab } from "react-bootstrap";
// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";
// import ReviewStars from "../../Components/ReviewStars";
// import DateTimeConverter from "../../Components/DateTimeConverter";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState(() => {
//     const storedCart = localStorage.getItem("cart");
//     return storedCart ? JSON.parse(storedCart) : [];
//   });

//   useEffect(() => {
//     fetch(`https://bazaar-buzz.onrender.com/product/products/${id}`)
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, [id]);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (product) => {
//     const existingProductIndex = cartItems.findIndex(
//       (item) => item.id === product.id
//     );

//     if (existingProductIndex !== -1) {
//       const updatedCart = [...cartItems];
//       updatedCart[existingProductIndex].quantity += 1;
//       setCartItems(updatedCart);
//       toast.success("Product quantity increased in cart!");
//     } else {
//       setCartItems([...cartItems, { ...product, quantity: 1 }]);
//       toast.success("Product added to cart!");
//     }
//   };

//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");
//   const [formError, setFormError] = useState("");

//   const handleRatingChange = (newRating) => {
//     setRating(newRating);
//   };

//   const handleReviewSubmit = (e) => {
//     e.preventDefault();
//     const user_id = localStorage.getItem("user_id");
//     if (rating === 0) {
//       setFormError("Please select a rating");
//       return;
//     }
//     console.log("Rating:", rating);
//     console.log("Review Text:", reviewText);

//     fetch("http://127.0.0.1:8000/product/products-review/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         rating: rating,
//         review_text: reviewText,
//         user: user_id,
//         product: id,
//       }),
//     })
//       .then((response) => response.json())
//       .catch((error) => {
//         console.error("Error submitting review:", error);
//         setFormError("An error occurred while submitting the review");
//       });

//     setRating(0);
//     setReviewText("");
//     setFormError("");
//   };

//   useEffect(() => {
//     fetch(`http://127.0.0.1:8000/product/products-review/?search=${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setReviews(data);
//         console.log(data);
//       });
//   }, [id]);

//   return (
//     <div className="bg-body-secondary">
//       <div className="container  py-5">
//         <div className="card mb-5">
//           <div className="card-body">
//             <div className="row">
//               <div className="col-md-6 p-5">
//                 <div>
//                   <img className="img-fluid" src={products.image} alt="" />
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <h4>{products.name}</h4>
//                 <p>Sold By: {products.top_category} Store</p>
//                 <p>Brand: {products.sub_category}</p>
//                 <p>{products.description}</p>
//                 <h4 className="text-danger">${products.price}</h4>
//                 <span>Stock Available</span>
//                 <br />
//                 <br />
//                 <button
//                   onClick={() => addToCart(products)}
//                   className="btn btn-danger"
//                 >
//                   Add To Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* PRODUCT DESCRIPTION AND REVIEW TAPS */}
//         <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
//           <Row>
//             <Col sm={4}>
//               <ListGroup className="d-flex   ">
//                 <ListGroup.Item action href="#link1" className="text-center">
//                   Description
//                 </ListGroup.Item>
//                 <ListGroup.Item action href="#link2" className="text-center">
//                   Review
//                 </ListGroup.Item>
//               </ListGroup>
//             </Col>
//             <Col sm={8}>
//               <Tab.Content>
//                 {/* PRODUCT DESCRIPTION */}
//                 <Tab.Pane eventKey="#link1">
//                   <h5>Specification:</h5>
//                   <div className="text-secondary">
//                     <h6>Brand: {products.sub_category}</h6>
//                     <h6>Model: {products.name}</h6>
//                     <h6>{products.description}</h6>
//                   </div>
//                 </Tab.Pane>
//                 <Tab.Pane eventKey="#link2">
//                   {formError && <Alert variant="danger">{formError}</Alert>}
//                   {/* SHOW ALL REVIEWS  */}
//                   <div>
//                     <div>
//                       {reviews.map((review) => (
//                         <div key={review.id} className="d-flex gap-2">
//                           <i className="bi bi-person-circle fs-2"></i>
//                           <div className="mt-2">
//                             <h5>{review.username}</h5>
//                             <div className="d-flex gap-2">
//                               <ReviewStars
//                                 totalStars={5}
//                                 initialRating={review.rating}
//                                 readonly
//                               />
//                               <h6 className="mt-1 text-secondary">
//                                 <DateTimeConverter
//                                   dateTimeString={review.created_at}
//                                 />
//                               </h6>
//                             </div>
//                             <p className="text-secondary">
//                               {review.review_text}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* REVIEW FORM */}
//                   <h4 className="mt-5">Write a Review for this product</h4>
//                   <Form onSubmit={handleReviewSubmit}>
//                     <Form.Group
//                       className="mb-3"
//                       controlId="exampleForm.ControlInput1"
//                     >
//                       <Form.Label>Your Rating</Form.Label>
//                       <ReviewStars
//                         totalStars={5}
//                         initialRating={rating}
//                         onRatingChange={handleRatingChange}
//                       />
//                     </Form.Group>
//                     <Form.Group
//                       className="mb-3"
//                       controlId="exampleForm.ControlTextarea1"
//                     >
//                       <Form.Label>Your Review</Form.Label>
//                       <Form.Control
//                         required
//                         as="textarea"
//                         rows={3}
//                         value={reviewText}
//                         onChange={(e) => setReviewText(e.target.value)}
//                       />
//                     </Form.Group>
//                     <Button variant="danger" type="submit">
//                       Submit
//                     </Button>
//                   </Form>
//                   <p className="mt-3">Current Rating: {rating}</p>
//                 </Tab.Pane>
//               </Tab.Content>
//             </Col>
//           </Row>
//         </Tab.Container>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import {
  Alert,
  Button,
  Col,
  Form,
  ListGroup,
  OverlayTrigger,
  Tab,
  Tooltip,
} from "react-bootstrap";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ReviewStars from "../../Components/ReviewStars";
import DateTimeConverter from "../../Components/DateTimeConverter";
import { useEffect, useState } from "react";
import RelatedProducts from "./RelatedProducts";
import { useAuth } from "../../Context/AuthContext";

const ProductDetails = () => {
  const { isLoggedIn } = useAuth();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    fetch(`https://bazaar-buzz.onrender.com/product/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [id]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const [selectedSize, setSelectedSize] = useState("One");
  const [selectedColor, setSelectedColor] = useState("Red");
  const [selectedQuantity, setSelectedQuantity] = useState("1");

  const addToCart = (product) => {
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      if (selectedSize == "" && selectedColor == "") {
        toast.error("Please select size and color.");
        return;
      }
      const updatedCart = [...cartItems];
      updatedCart[existingProductIndex].quantity += 1;
      setCartItems(updatedCart);

      console.log(selectedSize, selectedColor, selectedQuantity);
      toast.success("Product quantity increased in cart!");
    } else {
      if (selectedSize == "" && selectedColor == "") {
        toast.error("Please select size and color.");
        return;
      }
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      toast.success("Product added to cart!");
    }
  };

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [formError, setFormError] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    if (rating === 0) {
      setFormError("Please select a rating");
      return;
    }
    console.log("Rating:", rating);
    console.log("Review Text:", reviewText);

    fetch("https://bazaar-buzz.onrender.com/product/products-review/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: rating,
        review_text: reviewText,
        user: user_id,
        product: id,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setRating(0);
        setReviewText("");
        setFormError("");
        fetchReviews();
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        setFormError("An error occurred while submitting the review");
      });
  };

  const fetchReviews = () => {
    fetch(
      `https://bazaar-buzz.onrender.com/product/products-review/?search=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        // console.log(data);
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    // handleFormSubmit();
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    // handleFormSubmit();
  };

  const handleQuantityChange = (e) => {
    setSelectedQuantity(e.target.value);
    // handleFormSubmit();
  };

  // const handleFormSubmit = () => {
  //   console.log("Selected Size:", selectedSize);
  //   console.log("Selected Color:", selectedColor);
  //   console.log("Selected Quantity:", selectedQuantity);
  // };

  return (
    <div className="bg-body-secondary">
      <div className="container  py-5">
        <div className="card mb-5">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 p-5">
                <div>
                  <img className="img-fluid" src={products.image} alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <h4>{products.name}</h4>
                <p>Sold By: {products.top_category} Store</p>
                <p>Brand: {products.sub_category}</p>
                <div className="d-flex gap-2">
                  <p className="mt-1">Rated: </p>
                  <ReviewStars totalStars={5} initialRating={5} readonly />
                  <span className="mt-1">(50)</span>
                </div>

                <div>
                  <div className="d-flex flex-column mb-3">
                    <p>Size:</p>
                    <Form.Select
                      aria-label="Size"
                      onChange={(e) => handleSizeChange(e.target.value)}
                    >
                      <option>Select</option>
                      <option value="One">One</option>
                      <option value="Two">Two</option>
                      <option value="Three">Three</option>
                    </Form.Select>
                  </div>

                  <div className="d-flex flex-column mb-3">
                    <p>Color:</p>
                    <div className="d-flex gap-1">
                      <Form.Check
                        type="radio"
                        id="colorOption1"
                        name="colorOptions"
                        label="Red"
                        value="Red"
                        checked={selectedColor === "Red"}
                        onChange={() => handleColorChange("Red")}
                      />
                      <Form.Check
                        type="radio"
                        id="colorOption2"
                        name="colorOptions"
                        label="Blue"
                        value="Blue"
                        checked={selectedColor === "Blue"}
                        onChange={() => handleColorChange("Blue")}
                      />
                      <Form.Check
                        type="radio"
                        id="colorOption3"
                        name="colorOptions"
                        label="Green"
                        value="Green"
                        checked={selectedColor === "Green"}
                        onChange={() => handleColorChange("Green")}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-column mb-3">
                    <p>Quantity:</p>
                    <Form.Select
                      aria-label="Quantity"
                      defaultValue={selectedQuantity}
                      onChange={handleQuantityChange}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Form.Select>
                  </div>
                </div>
                {/* <p>{products.description}</p> */}
                <h4 className="text-danger">${products.price}</h4>
                <span>Stock Available</span>
                <br />
                <br />

                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => addToCart(products)}
                      className="btn btn-danger"
                    >
                      Add To Cart
                    </button>
                  </>
                ) : (
                  <>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id={`tooltip-bottom`}>Please Login.</Tooltip>
                      }
                    >
                      <Button variant="danger">Add To Cart</Button>
                    </OverlayTrigger>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT DESCRIPTION AND REVIEW TABS */}
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <div>
            <Col sm={4} md={3}>
              <ListGroup horizontal>
                <ListGroup.Item
                  variant="secondary"
                  action
                  href="#link1"
                  className="text-center"
                >
                  Description
                </ListGroup.Item>
                <ListGroup.Item
                  variant="secondary"
                  action
                  href="#link2"
                  className="text-center"
                >
                  Review
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <div className="mt-4">
              <Tab.Content>
                {/* PRODUCT DESCRIPTION */}
                <Tab.Pane eventKey="#link1">
                  <h5>Specification:</h5>
                  <div className="text-secondary">
                    <h6>Brand: {products.sub_category}</h6>
                    <h6>Model: {products.name}</h6>
                    <h6>{products.description}</h6>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">
                  {formError && <Alert variant="danger">{formError}</Alert>}
                  {/* SHOW ALL REVIEWS  */}
                  <div>
                    <div>
                      {reviews.map((review) => (
                        <div key={review.id} className="d-flex gap-2">
                          <i className="bi bi-person-circle fs-2"></i>
                          <div className="mt-2">
                            <h5>{review.username}</h5>
                            <div className="d-flex gap-2">
                              <ReviewStars
                                totalStars={5}
                                initialRating={review.rating}
                                readonly
                              />
                              <h6 className="mt-1 text-secondary">
                                <DateTimeConverter
                                  dateTimeString={review.created_at}
                                />
                              </h6>
                            </div>
                            <p className="text-secondary">
                              {review.review_text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* REVIEW FORM */}
                  <h4 className="mt-5">Write a Review for this product</h4>
                  <Form onSubmit={handleReviewSubmit}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Your Rating</Form.Label>
                      <ReviewStars
                        totalStars={5}
                        initialRating={rating}
                        onRatingChange={handleRatingChange}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Your Review</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows={3}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="danger" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
        <RelatedProducts products={products}></RelatedProducts>
      </div>
    </div>
  );
};

export default ProductDetails;
