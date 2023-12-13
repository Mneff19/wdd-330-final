import ApplicationServices from "./modules/ApplicationServices.mjs";
import JWTServices from "./modules/JWTServices.mjs";

const appServices = new ApplicationServices();
const jwtService = new JWTServices();

const jwt = appServices.getLocalItem('jwt');
if (jwt) {
    try {
        const jwtPayload = await jwtService.verifyJWT(jwt);
        document.querySelector(".s-profile").classList.add('authenticated');
        populateProfileInfo(jwtPayload);
    } catch (e) {
        appServices.deleteLocalStorage('jwt');
        alert("Session has timed out, please log in again!");
    }
}

function populateProfileInfo (info) {
    const userID = info['id'];
    const profileInfo = info['profileInfo'];
    const weatherList = info['weatherList'];

    // Populate the profile info on the page
    for (const [profileProp, propVal] of Object.entries(profileInfo[userID])) {
        if (profileProp != "profilePicUrl") {
            document.querySelector(`#${profileProp}`).textContent = propVal;
        } else {
            document.querySelector(`#profilePic`).setAttribute("src", propVal);
            document.querySelector(`#profilePic`).setAttribute("alt", "Profile picture of " + profileInfo[userID].firstname);
        }
    }

    // Display the results for the weather
    const desc = weatherList[0].weather[0].description;
    document.querySelector("#degrees").innerHTML = `${weatherList[0].main.temp}&deg;F`;
    document.querySelector("#weatherType").textContent = desc;
}