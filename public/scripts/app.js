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

    static removeBubbletea(id) {
      const bubbleteas = StoreBubbletea.getBubbleteas();
      console.log(bubbleteas);
      bubbleteas.forEach((bubbletea, index) => {
        if (bubbletea.bubbleteaId == id) {
          bubbleteas.splice(index, 1);
        }
      });
      localStorage.setItem("bubbletea", JSON.stringify(bubbleteas));
    }
  }

  // Add to Cart
  let imageUrl, bubbleteaName, bubbleteaPrice, bubbleteaId;
  let addToCartBtns = document.querySelectorAll("#addToCart");
  addToCartBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      imageUrl =
        e.target.parentElement.parentElement.children[0].childNodes[1]
          .currentSrc;
      bubbleteaName = e.target.parentElement.children[0].innerHTML;
      bubbleteaPrice = e.target.parentElement.children[1].children[0].innerHTML;
      bubbleteaId = e.target.nextElementSibling.innerHTML;
      // console.log(e.target.nextElementSibling.innerHTML);
      const bubbletea = {
        imageUrl,
        bubbleteaName,
        bubbleteaPrice,
        bubbleteaId,
      };
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
      const bubbleteas = storedBubbleteas;
      bubbleteas.forEach((bubbletea) => cartUI.addToCart(bubbletea));
    }
    static addToCart(bubbletea) {
      // const bubbleList = document.querySelector("#cart-items");
      // const tableRow = document.createElement("tr");
      // tableRow.innerHTML = `
      //   <td class="align-middle p-1"><img src="${bubbletea.imageUrl}" style="width:120px; height:auto" alt=""/></td>
      //   <td class="align-middle">${bubbletea.bubbleteaName}</td>
      //   <td class="align-middle">${bubbletea.bubbleteaPrice}</td>
      //   <td class="align-middle"><a href="#"><i class="bi bi-eraser fa-2x removeBubbletea" style="color:#ff0000"></i></a></td>
      //   <td class="d-none">${bubbletea.bubbleteaId}</td>
      // `;
      // bubbleList.appendChild(tableRow);

      $("<tr/>").html(`
        <td class="align-middle p-1"><img src="${bubbletea.imageUrl}" style="width:120px; height:auto" alt=""/></td>
        <td class="align-middle">${bubbletea.bubbleteaName}</td>
        <td class="align-middle">${bubbletea.bubbleteaPrice}</td>
        <td class="align-middle"><i class="bi bi-eraser fa-2x removeBubbletea" style="color:#ff0000"></i></td>
        <td class="d-none">${bubbletea.bubbleteaId}</td>
      `).appendTo('#cart-items')
    }

    static removeUIBubbletea(el) {
      if (el.classList.contains('removeBubbletea')) {
        el.parentElement.parentElement.remove()
      }
    }
  }

  $(".cartBtn").click(() => {
    $("#cart-items").text("");
    cartUI.displayCartItems();
  });

  $("#cart-items").click(e => {
    cartUI.removeUIBubbletea(e.target);
    // console.log(e.target.parentElement.nextElementSibling.textContent);
    StoreBubbletea.removeBubbletea(
      e.target.parentElement.nextElementSibling.textContent
    );
  })
});
