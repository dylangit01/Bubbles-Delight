$(document).ready(function () {
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

    static removeBubbletea(bubbletea) {}
  }

  // Add to Cart
  let imageUrl, bubbleteaName, bubbleteaPrice;
  let addToCartBtns = document.querySelectorAll("#addToCart");
  addToCartBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      imageUrl =
        e.target.parentElement.parentElement.children[0].childNodes[1]
          .currentSrc;
      bubbleteaName = e.target.parentElement.children[0].innerHTML;
      bubbleteaPrice = e.target.parentElement.children[1].innerHTML;
      // console.log(imageUrl, bubbleteaName, bubbleteaPrice);

      const bubbletea = { imageUrl, bubbleteaName, bubbleteaPrice };
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
  }

  // UI Class: Handle UI tasks
  class cartUI {
    static displayCartItems() {
      const storedBubbleteas = StoreBubbletea.getBubbleteas();
      let bubbleteas = [];
      console.log(bubbleteas);
      bubbleteas = storedBubbleteas;
      bubbleteas.forEach((bubbletea) => cartUI.addToCart(bubbletea));
    }
    static addToCart(bubbletea) {
      const bubbleList = document.querySelector("#cart-items");

      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
        <td>${bubbletea.imageUrl}</td>
        <td>${bubbletea.bubbleteaName}</td>
        <td>${bubbletea.bubbleteaPrice}</td>
        <td><a href="#" class="btn btn-outline-danger btn-sm delete">X</a></td>
      `;
      bubbleList.appendChild(tableRow);

      // $("<tr/>").html(`
      // <td>${bubbletea.imageUrl}</td>
      // <td>${bubbletea.bubbleteaName}</td>
      // <td>${bubbletea.bubbleteaPrice}</td>
      // <td><a href="#" class="btn btn-outline-danger btn-sm delete">X</a></td>
      // `).appendTo('#cart-items')

    }
  }

  $(".cartBtn").click(() => {
    $("#cart-items").text('')
    cartUI.displayCartItems();
  });




});
