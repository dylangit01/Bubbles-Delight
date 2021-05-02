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
  $(".trigger_cart").click(function() {
    console.log('11111');
    setTimeout(() => {
      $(".cart").show();
    }, 200);
    $(".cartCloseButton").click(function () {
      $(".cart").hide();
    });
  });

});

const router = async () => {
  const routes = [
    { path: '/', view: () => console.log('Viewing main page') },
    { path: '/menu', view: () => console.log('Viewing menu page') },
    { path: '/login', view: () => console.log('Viewing login page') },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map(route => {
    return {
      route,
      isMatch: location.pathname === route.path
    };
  });
  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

  if (!match) {   // if no match, back to default path, which is '/';
    match = {
      route: routes[0],
      isMatch: true,
    }
  }
  console.log(match.route.view());
}

document.addEventListener('DOMContentLoaded', () => router());
