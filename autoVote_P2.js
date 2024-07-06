// ==UserScript==
// @name         Dank Memer Freemium AutoVote Part 2
// @namespace    what
// @version      v1
// @description  autovote les go
// @author       du_cc
// @match        https://dankmemer.lol/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dankmemer.lol
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  var debounce = false;

  const originalFetch = window.fetch;
  window.fetch = function (input, init) {
    const method = (init && init.method) || "GET";
    const body = init && init.body;

    if (input.includes("/api/freemium") && method === "POST") {
      if (debounce === true) {
        console.log("Debouncing vote");
        return;
      }
      if (body) {
        if (typeof body === "string") {
          try {
            const parsedBody = JSON.parse(body);
            if (parsedBody.token) {
              console.log("Token found:", parsedBody.token);
              setTimeout(() => {
                fetch("https://dankmemer.lol/api/freemium", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    picked: [0, 1, 2],
                    token: parsedBody.token,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log("Vote response:", data);

                    if (data.success) {
                      debounce = true;
                      alert("Vote success");
                      window.location.reload();
                    } else {
                      alert("Vote failed");
                    }
                  })
                  .catch((error) => {
                    console.error("Error voting:", error);
                  });
              }, 1000);
            } else {
              console.log("No token found");
            }
          } catch (error) {
            console.error("Error parsing body:", error);
          }
        }
      }
    }

    return originalFetch.apply(this, arguments);
  };
})();
