$(document).ready(function() {
  //  const $row = $(this).closest("tr"); // Find closest row <tr>
  //  const orderID = $row.find(".order-id").text(); // Get descendent with order-id class
  //  const eta = $row.find("input").val(); // Get descendent input element and it's value
  //  const status = $row.find("select").val();

  // $(".order-status-update").on("click", restaurantSubmitHandler);

  // const findPickMeBtn = function () {
  //   const $temp = $(this).closest("#addToCart");
  //   console.log($temp);
  // };

  // $("#addToCart").on('click', findPickMeBtn);

  // Add chosen item and show cart Number indication:

  let addToCartBtns = document.querySelectorAll("#addToCart");
  addToCartBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const itemNum = JSON.parse(localStorage.getItem("bubbletea")).length;
      console.log(itemNum);
      $("#cartNum").text(itemNum);
    })
  );




});
