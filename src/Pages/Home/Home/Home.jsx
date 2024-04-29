import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import Delivery from "../Delivery/Delivery";
import DiscountThumbnail from "../DiscountThumbnail/DiscountThumbnail";
import FlashDeals from "../FlashDeals/FlashDeals";
import MobilePhones from "../MobilePhones/MobilePhones";
import { Modal } from "react-bootstrap";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if it's the user's first visit in this session
    const isFirstVisitInSession =
      sessionStorage.getItem("isFirstVisit") === null;

    if (isFirstVisitInSession) {
      setShowModal(true);
      sessionStorage.setItem("isFirstVisit", "false");
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <div className="app">
        <Modal show={showModal} onHide={handleCloseModal} centered modal-lg>
          <Modal.Header closeButton></Modal.Header>
          <div className="row">
            <div className="col-md-5">
              <img
                className="img-fluid"
                src="https://bazaar.ui-lib.com/assets/images/newsletter/bg-1.png"
                alt=""
              />
            </div>
            <div className="col-md-7  p-3">
              <div className="text-center">
                <h6>UP TO 30% OFF</h6>
                <h5>Sign up to BAZAAR BUZZ</h5>
                <p>
                  Subscribe to the BAZAR eCommerce newsletter to receive timely
                  updates from your favorite products.
                </p>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <div className="d-grid mt-2">
                  <button className="btn btn-danger" type="submit">
                    Submit
                  </button>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </Modal>
      </div>
      <Banner></Banner>
      <div className="bg-body-secondary mt-5 py-5">
        <div className="container">
          <FlashDeals></FlashDeals>
          <Categories></Categories>
          <MobilePhones></MobilePhones>
          <DiscountThumbnail></DiscountThumbnail>
          <Delivery></Delivery>
        </div>
      </div>
    </div>
  );
};

export default Home;
