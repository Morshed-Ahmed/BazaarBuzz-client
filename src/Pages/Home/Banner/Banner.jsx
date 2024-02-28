import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <div className="container">
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide-to="0"
              className="active bg-primary"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              className="bg-primary"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              className="bg-primary"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row">
                <div className="col-md-6 d-flex flex-column justify-content-center">
                  <h1>50% Off For Your First Shopping</h1>
                  <p>
                    High-quality, durable, and stylish product. Perfect for
                    everyday use. Limited offer, dont miss out!
                  </p>
                  <div>
                    <Link
                      style={{
                        textDecoration: "none",
                      }}
                      to={`/allProducts/${"All"}`}
                    >
                      <button
                        type="button"
                        className="btn btn-danger px-5 py-2 d-inline"
                      >
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="https://bazaar.ui-lib.com/assets/images/products/nike-black.png"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-6 d-flex flex-column justify-content-center">
                  <h1>50% Off For Your First Shopping</h1>
                  <p>
                    High-quality, durable, and stylish product. Perfect for
                    everyday use. Limited offer, dont miss out!
                  </p>
                  <div>
                    <Link
                      style={{
                        textDecoration: "none",
                      }}
                      to={`/allProducts/${"All"}`}
                    >
                      <button
                        type="button"
                        className="btn btn-danger px-5 py-2 d-inline"
                      >
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="https://bazaar.ui-lib.com/assets/images/products/nike-black.png"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-6 d-flex flex-column justify-content-center">
                  <h1>50% Off For Your First Shopping</h1>
                  <p>
                    High-quality, durable, and stylish product. Perfect for
                    everyday use. Limited offer, dont miss out!
                  </p>
                  <div>
                    <Link
                      style={{
                        textDecoration: "none",
                      }}
                      to={`/allProducts/${"All"}`}
                    >
                      <button
                        type="button"
                        className="btn btn-danger px-5 py-2 d-inline"
                      >
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    src="https://bazaar.ui-lib.com/assets/images/products/nike-black.png"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
