console.log("client side javascript file is loaded");

//make http request from client side javascript
//fetch is browser based API, not accessible in NODE.js
//not able to be used in back-end node script
//fetch works like the request in the node.js

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); //prevent refresh browser
  const location = search.value; // extract input value
  messageOne.textContent = "loading";

  fetch("/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
