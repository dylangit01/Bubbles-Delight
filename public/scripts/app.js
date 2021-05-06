$(document).ready(function() {
  // Get cart number from localStorage:
  // const itemNum = JSON.parse(localStorage.getItem("bubbletea")).length;
  // $("#cartNum").text(itemNum);

  // Build localStorage class and fns:
  class StoreBubbletea {
    static getBubbleteas() {
      let bubbleteas;
      if (localStorage.getItem("bubbletea") === null) {
        bubbleteas = [];
      } else {
        bubbleteas = JSON.parse(localStorage.getItem("bubbletea"));
      }
      return bubbleteas;
    }

    static addBubbletea(bubbletea) {
      const bubbleteas = StoreBubbletea.getBubbleteas();
      bubbleteas.push(bubbletea);
      localStorage.setItem("bubbletea", JSON.stringify(bubbleteas));
    }

    static removeBubbletea(id) {
      const bubbleteas = StoreBubbletea.getBubbleteas();
      // console.log(bubbleteas);
      bubbleteas.forEach((bubbletea, index) => {
        if (bubbletea.bubbleteaId == id) {
          bubbleteas.splice(index, 1);
        }
      });
      localStorage.setItem("bubbletea", JSON.stringify(bubbleteas));
    }
  }

  // Add chosen item to cart:
  let imageUrl, bubbleteaName, bubbleteaPrice, bubbleteaId;
  let addToCartBtns = document.querySelectorAll("#addToCart");
  addToCartBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      imageUrl = e.target.parentElement.parentElement.children[0].childNodes[1].currentSrc;
      bubbleteaName = e.target.parentElement.children[0].innerHTML;
      bubbleteaPrice = e.target.parentElement.children[1].children[0].innerHTML;
      bubbleteaId = e.target.nextElementSibling.innerHTML;

      const bubbletea = { imageUrl, bubbleteaName, bubbleteaPrice, bubbleteaId, };
      StoreBubbletea.addBubbletea(bubbletea);
    })
  );

  // Add event listener to cart button:
  class Bubbletea {
    constructor(imageUrl, bubbleteaName, bubbleteaPrice) {
      this.imageUrl = imageUrl;
      this.bubbleteaName = bubbleteaName;
      this.bubbleteaPrice = bubbleteaPrice;
    }
  };

  // UI Class: Handle UI tasks
  class cartUI {
    static displayCartItems() {
      const storedBubbleteas = StoreBubbletea.getBubbleteas();
      const bubbleteas = storedBubbleteas;
      bubbleteas.forEach((bubbletea) => cartUI.addToCart(bubbletea));
    };

    static addToCart(bubbletea) {
      $("<tr/>")
        .html(
          `
        <td class="align-middle p-1"><img src="${bubbletea.imageUrl}" style="width:120px; height:auto; border-radius: 3px;" alt=""/></td>
        <td class="align-middle">${bubbletea.bubbleteaName}</td>
        <td class="align-middle">${bubbletea.bubbleteaPrice}</td>
        <td class="align-middle">
          <div class="form-group m-0">
            <label for="exampleFormControlSelect1"></label>
            <select class="form-control-sm px-5" id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>
        </td>
        <td class="align-middle"><i class="bi bi-x fa-2x btn removeBubbletea" style="color:#ff0000"></i></td>
        <td class="d-none">${bubbletea.bubbleteaId}</td>
        `
        )
        .appendTo("#cart-items");
    }

    // Remove UI list item:
    static removeUIBubbletea(el) {
      if (el.classList.contains("removeBubbletea")) {
        el.parentElement.parentElement.remove();
      }
    }
  };

  // Handle showing cart items event
  $(".cartBtn").click(() => {
    $("#cart-items").text("");
    cartUI.displayCartItems();
  });

  // Handle remove btn of Cart item:
  $("#cart-items").click((e) => {

    // const cartItemNumber = StoreBubbletea.getBubbleteas().length;
    // console.log(cartItemNumber);
    // // console.log($("#cartNum").text());

    cartUI.removeUIBubbletea(e.target);     // Remove item from UI
    const $row = $(this).closest("tr");     // Find tr element
    const removeButton = $row.find(".removeBubbletea").text(); // Find element text content with removeBubbletea class
    // console.log(typeof removeButton);
    // if (removeButton) {                  // If statement to filter null/undefined textContent
      StoreBubbletea.removeBubbletea(
        e.target.parentElement.nextElementSibling.textContent
      );
    // }





  });









});
