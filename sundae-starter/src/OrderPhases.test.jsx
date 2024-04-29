import { render, screen } from "./test-utils/testing-library-utils";
import { userEvent } from "@testing-library/user-event";
import { expect } from "vitest";
import App from "./App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();
  // render app
  // Don't need to wrap in provider, already wrapped!

  // destructure 'unmount' from return value to use at the end of the test
  //   const { unmount } =
  render(<App />);
  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);

  // find and click order summary button
  const orderSummaryButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

  // check summary subtotals
  const summaryHeading = await screen.findByRole("heading", {
    name: "Order Summary",
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", {
    name: "Scoops: $6.00",
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);

  // Expect "loading" to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // check confirmation page text
  // this one is async because there is a POST request to server in between summary
  // and confirmation pages
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  // expect that loading has disappeared
  const notLoading = screen.getByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number:/i);
  expect(orderNumber).toBeInTheDocument();

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /new order/i,
  });
  await user.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = await screen.findByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  // unmount the component to trigger cleanup and avoid "not wrapped in act()" error
  //   unmount();
  // do we need to await anything to avoid test errorer:
});

// test("toppings header is not on summary page if no toppings ordered", async () => {
//   const user = userEvent.setup();
//   // render app
//   render(<App />);

//   // add ice cream scoops but no toppings
//   const vanillaInput = await screen.findByRole("spinbutton", {
//     name: "Vanilla",
//   });
//   await user.clear(vanillaInput);
//   await user.type(vanillaInput, "1");

//   const chocolateInput = await screen.findByRole("spinbutton", {
//     name: "Chocolate",
//   });
//   await user.clear(chocolateInput);
//   await user;

//   // find and click order summary button
//   const orderSummaryButton = screen.getByRole("button", {
//     name: /order sundae/i,
//   });
//   await user.click(orderSummaryButton);

//   const scoopHeading = screen.getByRole("heading", {
//     name: "Scoops: $6.00",
//   });
//   expect(scoopHeading).toBeInTheDocument();

//   const toppingsHeading = screen.queryByRole("heading", {
//     name: /toppings/i,
//   });
//   expect(toppingsHeading).not.toBeInTheDocument();
// });
