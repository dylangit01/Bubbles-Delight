$(document).ready(function() {

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
