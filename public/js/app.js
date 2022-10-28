const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const p1 = document.getElementById("message-1");
const p2 = document.getElementById("message-2");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let location = search.value;
    p1.textContent = "loading...";
    const url = `http://localhost:8000/weather?address=${location}`;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.code) {
                let from = data.from;
                let code = data.code;
                let mssg = data.message;
                p1.textContent = "ERROR: " + code + " from " + from;
                p2.textContent = mssg;
            } else {
                p1.textContent =
                    "Current temperature: " + data.app_temp + " °C";
                p2.textContent = data.location;
            }
        });
    });
});
