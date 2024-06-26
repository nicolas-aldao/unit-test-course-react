import { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../context/OrderDetails";
import { AlertBanner } from "../AlertBanner";
import { ScoopOption } from "../ScoopOptions";
import { ToppingOptions } from "../ToppingOptions";

export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    // create an abortController to attach to network request
    const controller = new AbortController();
    axios
      .get(`http://localhost:3030/${optionType}`, { signal: controller.signal })
      .then((response) => setItems(response.data))
      .catch((error) => {
        // console.log("err ", error);
        setError(true);
      });

    // abort axios call on componentn unmount
    // return () => controller.abort();
  }, [optionType]);

  if (error) return <AlertBanner />;

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOptions;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};
