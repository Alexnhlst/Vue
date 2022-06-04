// JS provides a CustomEvent API to create custom events
let event = new CustomEvent("customEvent", {
  detail: { book: "FullStack Vue" },
});

// Dispatching the event
element.dispatchEvent(event);

// Listening for the event
element.addEventListener("customEvent", (e) =>
  console.log("This book is " + e.detail.book)
);
