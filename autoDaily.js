var detectingCommands = ["daily"];

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function commandHandler(command, arg) {
  return new Promise(async (resolve) => {
    async function send(customCommand, customArg) {
      if (customCommand) {
        command = customCommand;
        if (customArg) {
          arg = customArg;
        }
      }
      let text = `/${command}`;
      if (arg) {
        text += ` ${arg}`;
      }
      const pasteEvent = new ClipboardEvent("paste", {
        bubbles: true,
        cancelable: true,
        clipboardData: new DataTransfer(),
      });

      pasteEvent.clipboardData.setData("text/plain", text);

      const e = document.querySelector('[role="textbox"]');

      e.dispatchEvent(pasteEvent);
      const chat = document.querySelector("ol");

      setTimeout(() => {
        const sendEvent = new KeyboardEvent("keydown", {
          key: "Enter",
          code: "Enter",
          which: 13,
          keyCode: 13,
          bubbles: true,
        });

        if (arg) {
          e.dispatchEvent(sendEvent);
        } else {
          e.dispatchEvent(sendEvent);
          e.dispatchEvent(sendEvent);
        }
      }, 200);
    }

    await send();

    resolve();
  });
}

await commandHandler("daily");
