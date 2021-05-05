

// wrap each row in a form
// event listener for the form on submit
// play with this
// For the select options
// https://learn.jquery.com/using-jquery-core/faq/how-do-i-get-the-text-value-of-a-selected-option/
// https://stackoverflow.com/questions/14460421/get-the-contents-of-a-table-row-with-a-button-click

const restaurantSubmitHandler = function() {
  const $row = $(this).closest("tr");
  const $orderId = $row.find('.order-id').text();
  const $eta = $row.find('input').val();
  console.log($orderId, $eta);

};


$(document).ready(function() {
  // Event listener on all the order status update buttons
  $('.order-status-update').on('click', restaurantSubmitHandler);
});
