

// wrap each row in a form
// event listener for the form on submit
// play with this
// For the select options
// https://learn.jquery.com/using-jquery-core/faq/how-do-i-get-the-text-value-of-a-selected-option/
// https://stackoverflow.com/questions/14460421/get-the-contents-of-a-table-row-with-a-button-click

// Handle updates from restaurant
const restaurantSubmitHandler = function() {
  const $row = $(this).closest("tr");               // Find closest row <tr>
  const orderID = $row.find('.order-id').text();   // Get descendent with order-id class
  const eta = $row.find('input').val();            // Get descendent input element and it's value
  const status = $row.find('select').val();        // Get descendent select element and it's currently selected option value
  const update = { orderID, eta, status };
  console.log(update);
  $.ajax({
    type: "POST",
    url: `/orders/${orderID}`,
    data: update
  });
};


$(document).ready(function() {
  // Event listener on all the order status update buttons
  $('.order-status-update').on('click', restaurantSubmitHandler);
});
