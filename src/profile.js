import FileServices from "./modules/FileServices.mjs";
import APIServices from "./modules/APIServices.mjs";

const fileService = new FileServices();
const profileInfo = await fileService.getFileJSON("profiles");

// Populate the profile info on the page
for (const [profileProp, propVal] of Object.entries(profileInfo["1"])) {
    if (profileProp != "profilePicUrl") {
        document.querySelector(`#${profileProp}`).textContent = propVal;
    } else {
        document.querySelector(`#profilePic`).setAttribute("src", propVal);
    }
}

const weatherAPI = new APIServices('https://api.openweathermap.org/data/2.5/forecast?lat=40.53183096915482&lon=-112.30080357417363&appid=84fd1805bbdfc8774858391be52c31e4&units=imperial');
const weatherList = await weatherAPI.apiFetch();

// Display the results for the weather
const desc = weatherList[0].weather[0].description;
document.querySelector("#degrees").innerHTML = `${weatherList[0].main.temp}&deg;F`;
document.querySelector("#weatherType").textContent = desc;