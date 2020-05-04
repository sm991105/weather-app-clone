const search = document.querySelector("input");
const weatherForm = document.querySelector("form");
const msg1 = document.querySelector("#message-1");
const msg2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  msg1.textContent = "";
  msg2.textContent = "Loading...";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.err) {
        msg1.textContent = data.err;
        msg2.textContent = "";
      } else {
        msg1.textContent = data.place_name;
        msg2.textContent = `${data.desc}.
        It's currently ${data.temp}°C but it feels like ${data.feelslike} outside.
        Wind blows ${data.wind}m/s, humidity is at ${data.humidity}%.`;
      }
    });
  });
}); // onSubmit
