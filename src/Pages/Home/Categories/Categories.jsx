import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://bazaar-buzz.onrender.com/category/topcategories/")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  return (
    <div className="my-5 pb-5">
      <h4>Categories</h4>

      <Row xs={2} md={5} className="g-4">
        {categories.map((category) => (
          <Col key={category.id}>
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
        ))}
      </Row>
    </div>
  );
};

export default Categories;
