import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";

export const ScoopOption = ({ name, imagePath }) => {
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e) => {
    updateItemCount(name, parseInt(e.target.value), "scoops");
  };

  return (
    <Col xs={12} sm={6} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "40%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`scoop-${name}`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
          ></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  );
};
