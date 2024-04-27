import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export const SummaryForm = ({ setOrderPhase }) => {
  const [disabledButton, setDisabledButton] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    // pass along to the next phase.
    // The next page will handle submitting order from context.
    setOrderPhase("completed");
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      {" "}
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          onChange={() => setDisabledButton(!disabledButton)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={disabledButton}>
        Confirm Order
      </Button>
    </Form>
  );
};
