import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://bazaar-buzz.onrender.com/category/topcategories/")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  return (
    <div className="my-5 pb-5">
      <h4>Categories</h4>
      {loading && (
        <>
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </>
      )}

      <Row xs={2} md={5} className="g-4">
        {categories.map((category) => (
          <Link
            style={{ textDecoration: "none" }}
            to={`/allProducts/${category.name}`}
            key={category.id}
          >
            <Col>
              <Card>
                <Card.Body className="d-flex justify-content-center align-items-center">
                  <div>
                    <Card.Img
                      className="img-fluid"
                      variant="top"
                      src={category?.image}
                      alt={category.name}
                      style={{ maxWidth: "50px" }}
                    />
                  </div>

                  <Card.Title>{category.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Link>
        ))}
      </Row>
    </div>
  );
};

export default Categories;
