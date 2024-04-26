// src/mocks/handlers.js
import { delay, http, HttpResponse } from "msw";

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get("http://localhost:3030/scoops", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json([
      { name: "Chocolate", imagePath: "/images/chocolate.png" },
      { name: "Vanilla", imagePath: "/images/vanilla.png" },
    ]);
  }),

  http.get("http://localhost:3030/toppings", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json([
      { name: "Cherries", imagePath: "/images/cherries.png" },
      { name: "M&Ms", imagePath: "/images/m-and-ms .png" },
      { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
    ]);
  }),

  http.post("http://localhost:3030/order", async () => {
    // ...and respond to them using this JSON response.
    await delay(400);
    return HttpResponse.json({ orderNumber: 12345565 }, { status: 201 });
  }),
];
