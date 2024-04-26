import {
  render,
  screen,
  logRoles,
} from "../../test-utils/testing-library-utils";
import { Options } from ".";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  //   screen.debug(scoopImages);
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((img) => img.alt);
  console.log("altText ", altText);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  // find images
  const images = await screen.findAllByRole("img", { name: /topping$/i });
  //   screen.debug(scoopImages);
  expect(images).toHaveLength(3);

  // confirm alt text of images
  const imageTitles = images.map((img) => img.alt);
  console.log("imageTitles ", imageTitles);
  expect(imageTitles).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
