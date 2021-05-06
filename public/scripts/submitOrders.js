$(document).ready(function () {
  class Spinner {
    static showSpinner(msg, className) {
      const div = document.createElement("div");
      div.className = `${className}`;
      div.appendChild(document.createTextNode(msg));
      const parentEl = document.querySelector(".spin-parent");
      const test = document.querySelector(".spin-child");
      parentEl.insertBefore(div, test);
      setTimeout(() => {
        document.querySelector(".cartSpinner").remove();
      }, 2000);
    }
  }

  $("#submitOrders").click((e) => {
    e.preventDefault();
    // jQuery cannot handle nested arrays and objects, so have to send string first
    // Server body-parser:json will convert string to object
    const order = localStorage.getItem("bubbletea");

    // Post orders to database
    $.ajax({
      type: "POST",
      url: "/orders",
      data: order,
      contentType: "application/json", // This is to prevent have FormData
    });

    // Send SMS to customer
    $.get("/sendSMS/customer", () => {
      console.log("Message sent to customer");
    });

    // // Send SMS to Owner
    $.get("/sendSMS/owner", () => {
      console.log("Message sent to owner");
    });

    // clear cart items after submitting:
    Spinner.showSpinner("", "cartSpinner");
    setTimeout(() => {
      $("#cart-items").text("");
      localStorage.clear();
    }, 2001);

    // Close the cart and redirect to orders page
    setTimeout(() => {
      $("#cartPage").modal("hide");
      $("#cartPage").on('hidden.bs.modal', () => {
        $("#cartNum").text('0');
        location.href = '/orders';
      });

    }, 2050);
  });
});
