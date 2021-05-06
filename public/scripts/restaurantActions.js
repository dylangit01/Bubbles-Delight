// Update table row relating to the order updated
const loadUpdatedOrder = function (rowToUpdate) {
  console.log(rowToUpdate);
};

// Handle updates from restaurant
const restaurantSubmitHandler = function () {
  const $row = $(this).closest("tr");             // Find closest row <tr>
  const orderID = $row.find(".order-id").text();  // Get descendent with order-id class
  const eta = $row.find("input").val();           // Get descendent input element and it's value
  const status = $row.find("select").val();       // Get descendent select element and it's currently selected option value
  const update = { orderID, eta, status };

  // Ajax call to update the status and eta of an open order
  const url = `/orders/${orderID}`;
  $.post(url, update).then((res) => console.log(res));

  // Ajax call to send sms to customer based on different status
  if (status === "IN PROGRESS") {
    $.post("/sendSMS/inprogress", update);
  } else if (status === "COMPLETED") {
    $.post("/sendSMS/completed", update)
      .then((res) => {
      location.href = `orders`;     // Refresh page after the status changing
    });
  }
};

$(document).ready(function() {
  // Event listener on all the order status update buttons
  $(".order-status-update").on("click", restaurantSubmitHandler);
});
