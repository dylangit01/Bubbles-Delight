$(document).ready(function() {

  class Spinner {
    static showSpinner(msg, className) {
      const div = document.createElement('div');
      div.className = `${className}`
      div.appendChild(document.createTextNode(msg));
      const parentEl = document.querySelector(".spin-parent");
      const test = document.querySelector(".spin-child");
      parentEl.insertBefore(div, test);
      setTimeout(() => {
        document.querySelector(".spinner").remove();
      }, 2000)
    }
  }

  $("#submitOrders").click((e) => {
    e.preventDefault();
    // jQuery cannot handle deep array, so have to send string
    const order = localStorage.getItem("bubbletea");

    $.ajax({
      type: "POST",
      url: "/orders",
      data: order,
      contentType: "application/json", // This is to prevent have FormData
    });

    // clear cart items after submitting:
    Spinner.showSpinner("", "spinner");
    setTimeout(() => {
      $("#cart-items").text("");
      localStorage.clear();
    },2001);

    // Close the cart:
    setTimeout(() => {
      $("#cartPage").modal('hide');
    }, 2050)
  });

});
