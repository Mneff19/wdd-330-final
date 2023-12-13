import JWTServices from "./modules/JWTServices.mjs";
import FileServices from "./modules/FileServices.mjs";
import ApplicationServices from "./modules/ApplicationServices.mjs";
import APIServices from "./modules/APIServices.mjs";

const appServices = new ApplicationServices();
const fileService = new FileServices();
const weatherAPI = new APIServices('https://api.openweathermap.org/data/2.5/forecast?lat=40.53183096915482&lon=-112.30080357417363&appid=84fd1805bbdfc8774858391be52c31e4&units=imperial');
const creds = await fileService.getFileJSON('creds');
const jwtServices = new JWTServices();

document.forms['loginForm'].addEventListener('submit', async function(e)  {
    e.preventDefault();
    const username = document.forms['loginForm'].username.value;
    const password = document.forms['loginForm'].password.value;

    if (Object.keys(creds).includes(username)) {
        if (creds[username].password == password) {
            const profileInfo = await fileService.getFileJSON("profiles");
            const weatherList = await weatherAPI.apiFetch();
            const jwtProps = {
                'profileInfo': profileInfo,
                'weatherList': weatherList,
                'id': creds[username].id
            };

            const jwt = await jwtServices.createJWT(jwtProps);
            appServices.setLocalItem('jwt', jwt);
            window.location = 'https://mneff19.github.io/wdd-330-final/profile/index.html';
        } else {
            alert("Incorrect password, please try again.")
        }
    } else {
        alert("Unknown username, please try another one.")
    }
})