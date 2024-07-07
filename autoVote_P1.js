// ==UserScript==
// @name         Dank Memer Freemium AutoVote
// @namespace    what
// @version      v1
// @description  autovote les go
// @author       du_cc
// @match        https://dankmemer.lol/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dankmemer.lol
// @grant        GM_webRequest
// ==/UserScript==

(function () {
  "use strict";

  var token = "";

  var state = 0;

  var nBlock = 0;

  const voteBtn = document.querySelector('button[variant="success"]');

  const voteObserver = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "disabled"
      ) {
        if (!voteBtn.hasAttribute("disabled")) {
          execute();
        }
      }
    }
  });

  if (voteBtn.hasAttribute("disabled")) {
    voteObserver.observe(voteBtn, { attributes: true });
  } else {
    execute();
  }

  function freemiumAPI(action) {
    if (action === "block") {
      GM_webRequest(
        [{ selector: "https://dankmemer.lol/api/freemium", action: "cancel" }],
        (info, message, details) => {
          if (nBlock > 3) {
            freemiumAPI("allow");
            nBlock = 0;
          } else {
            console.log("request blocked:", info, message, details);
            nBlock++;
          }
        }
      );
    } else if (action === "allow") {
      GM_webRequest(
        [{ selector: "https://dankmemer.lol/api/freemium", action: "allow" }],
        (info, message, details) => {
          console.log("request blocked:", info, message, details);
        }
      );
    }
  }

  function execute() {
    console.log("state", state);
    if (state === 0) {
      voteObserver.disconnect();
      voteBtn.click();
      setTimeout(() => {
        state = 1;
        voteObserver.observe(voteBtn, { attributes: true });
      }, 100);
    }

    if (state === 1) {
      freemiumAPI("block");
      voteObserver.disconnect();
      state = 2;
      voteBtn.click();
      setTimeout(() => {
        state = 3;
        const card = document.querySelector(
          'img[src="/img/memer.webp"]:not([alt="Logo"])'
        ).parentElement.parentElement.parentElement;
        card.click();
        setTimeout(() => {
          const claimBtn = document.querySelector('button[variant="primary"]');
          claimBtn.click();
          setTimeout(() => {
            state = 4;
            voteBtn.click();
          }, 100);
        }, 100);
      }, 100);
    }
  }
})();
