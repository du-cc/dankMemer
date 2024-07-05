const voteBtn = document.querySelector('button[variant="success"]');

function vote() {
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

    const visibilityChangeEvent = new Event("visibilitychange");
    document.dispatchEvent(visibilityChangeEvent);
  };

  setInterval(forceFocus, 100);
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

if (document.body.innerHTML.includes("AdBlocker")) {
  window.location.reload();
} else if (document.body.innerText.includes("You can vote in")) {
  console.log("You have already voted");
}

if (voteBtn.hasAttribute("disabled")) {
  observer.observe(voteBtn, { attributes: true });
} else {
  vote();
}

// GM_setValue("autoVote_daily", true);

// window.open("https://discord.com/channels/879243001774358528/1253592050260119593", "_blank");
