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

// Actual fn to avoid page refresh:
const navigateTo = url => {
  history.pushState(null, null, url);
  router();
}

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
// For url able to back and forth
document.addEventListener('popstate', router);

// Add event listener for those links, so that they will preventDefault and navigate to own urls:
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  })

  router();
});
