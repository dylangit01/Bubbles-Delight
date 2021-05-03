// $("document").ready(() => {
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users",
//   }).done((users) => {
//     for (user of users.users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });
// })

$("document").ready(() => {
  $(".trigger_cart").click(function () {
    console.log("11111");
    setTimeout(() => {
      $(".cart").show();
    }, 200);
    $(".cartCloseButton").click(function () {
      $(".cart").hide();
    });
  });
});

import Login from "./Login.js";
import Menu from "./Menu.js";
import Main from "./Main.js";

// Actual fn to avoid page refresh:
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: Main },
    { path: "/bubbleteas", view: Menu },
    { path: "/login", view: Login },
    // { path: '/cart', view: () => console.log('Viewing cart page') },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route,
      isMatch: location.pathname === route.path,
    };
  });
  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    // if no match, back to default path, which is '/';
    match = {
      route: routes[0],
      isMatch: true,
    };
  }
  const loginView = new match.route.view();
  document.querySelector("#appComponent").innerHTML = await loginView.getHtml();
  // console.log(new match.route.view());
};
// For url able to back and forth
document.addEventListener("popstate", router);

// Add event listener for those links, so that they will preventDefault and navigate to own urls:
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
