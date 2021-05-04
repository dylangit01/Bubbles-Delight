$(document).ready(function() {

  $('#submitOrders').click(e => {
    e.preventDefault();
    // jQuery cannot handle deep array, so have to send string
    const order = localStorage.getItem("bubbletea");
    console.log(order);

    $.ajax({
      type: "POST",
      url: "/orders",
      data: order,
      contentType: "application/json"   // This is to prevent have FormData
    });

  });





});
