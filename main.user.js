const voteBtn = document.querySelector('button[variant="success"]');
var state = 0;

function vote() {
  state = 1;
  observer.disconnect();
  voteBtn.click();

  setTimeout(() => {
    voteBtn.click();
  }, 2300);

  setTimeout(() => {
    const memeImgs = document.querySelectorAll(
      'img[src="/img/memer.webp"]:not([alt="Logo"])'
    );

    memeImgs.forEach((img, index) => {
      setTimeout(() => {
        const card = img.parentElement.parentElement.parentElement;
        card.click();
      }, 100 * index);
    });
  }, 3500);

  setTimeout(() => {
    const selBtn = document.querySelectorAll('button[variant="primary"]');

    const clickAllButtons = (buttons) => {
      buttons.forEach((btn) => {
        requestAnimationFrame(() => {
          btn.click();
        });
      });
    };

    clickAllButtons(selBtn);

    Object.defineProperty(document, "hidden", {
      get: function () {
        return false;
      },
    });

    Object.defineProperty(document, "visibilityState", {
      get: function () {
        return "visible";
      },
    });

    const forceFocus = () => {
      const focusEvent = new Event("focus");
      window.dispatchEvent(focusEvent);

      // Create and dispatch visibilitychange event
      const visibilityChangeEvent = new Event("visibilitychange");
      document.dispatchEvent(visibilityChangeEvent);
    };

    setInterval(forceFocus, 100);
   
    setTimeout(() => {
      observer.observe(voteBtn, { attributes: true });
    }, 1000);

  }, 4000);

}


const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (
      mutation.type === "attributes" &&
      mutation.attributeName === "disabled"
    ) {
      vote();
    }
  }
});

if (document.body.innerText.includes("AdBlocker")) {
  window.location.reload();
} else if (document.body.innerText.includes("You can vote in")) {
  console.log("You have already voted");
}

if (voteBtn.hasAttribute("disabled")) {
  observer.observe(voteBtn, { attributes: true });
} else {
  if (state == 0) {
    vote();
  } else {
    voteBtn.click();
  }
}
