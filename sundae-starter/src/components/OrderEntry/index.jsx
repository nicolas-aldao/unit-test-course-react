import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";
import { Options } from "../Options";

export const OrderEntry = ({ setOrderPhase }) => {
  const { totals } = useOrderDetails();

  return (
    <div>
      <h1>Design your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button onClick={() => setOrderPhase("review")}>Order Sundae!</Button>
    </div>
  );
};
