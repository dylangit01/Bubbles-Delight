// Update table row relating to the order updated
const loadUpdatedOrder = function (rowToUpdate) {
  console.log(rowToUpdate);
};

// Handle updates from restaurant
const restaurantSubmitHandler = function () {
  const $row = $(this).closest("tr"); // Find closest row <tr>
  const orderID = $row.find(".order-id").text(); // Get descendent with order-id class
  const eta = $row.find("input").val(); // Get descendent input element and it's value
  const status = $row.find("select").val(); // Get descendent select element and it's currently selected option value
  const update = { orderID, eta, status };

  // Ajax call to update the status and eta of an open order
  $.ajax({
    type: "POST",
    url: `/orders/${orderID}`,
    data: update,
  });

  console.log(status);
  if (status === "IN PROGRESS") {
    $.ajax({
      type: "POST",
      url: `/sendSMS/inprogress`,
      data: update
    }, () =>
      console.log("in progress")
    );
  } else if (status === "COMPLETED") {
    $.ajax({
      type: "POST",
      url: `/sendSMS/completed`,
      data: update
    }, () =>
      console.log("completed")
    );
  }

  // Refresh page to /restaurant/id/orders
  location.href = `orders`;
};

$(document).ready(function () {
  // Event listener on all the order status update buttons
  $(".order-status-update").on("click", restaurantSubmitHandler);
});
