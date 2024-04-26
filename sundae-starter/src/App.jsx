import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./context/OrderDetails";
import { Options } from "./components/Options";
import { SummaryForm } from "./components/SummaryForm";
import { OrderEntry } from "./components/OrderEntry";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
