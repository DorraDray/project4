const form = document.getElementById("messageForm");
const messageContainer = document.getElementById("messageContainer");
const messageTitle = document.getElementById("messageTitle");
let messageCount = 0;

form.addEventListener("submit", async function(event){
    event.preventDefault();
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData);
    const response = await fetch("http://localhost:8080/messages", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(formValues),
        

    });
    const json = await response.json();
    renderMessage({message: formValues.message, smiley: formValues.smiley, name: formValues.name, id: json.lastInsertRowid});
    messageCount++;
    renderTilte();
});

async function getmessages() {
    // get the messages from our Database via our API
    const response = await fetch("http://localhost:8080/messages");
    const messages = await response.json();
    messageCount = messages.length;
    renderTilte();
    // loop through the messages and render them on the page
    messages.forEach(function (message) {
      renderMessage(message);
    }
  );
}

async function deleteMessage(id) {
  // get the messages from our Database via our API
  const response = await fetch("http://localhost:8080/messages/"+id, {
    method: "DELETE"
  });
  document.getElementById("message-"+id).remove();
  messageCount--;
  renderTilte();
}

  function renderTilte() {
    messageTitle.textContent = `${messageCount} Messages`;
  }

  function renderMessage(message) {
      const p = document.createElement("p");
      p.id = "message-"+message.id;
      p.textContent = `${message.smiley}  ${message.name}  sayd: ${message.message}`;
      const button = document.createElement("button");
      button.textContent = "Delete";
      p.appendChild(button);
      button.addEventListener("click", async function(event){
          deleteMessage(message.id);
      });
      messageContainer.appendChild(p);
  }
  
  getmessages();