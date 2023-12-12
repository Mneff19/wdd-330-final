// import JWTServices from "./modules/JWTServices.mjs";
import FileServices from "./modules/FileServices.mjs";
import ApplicationServices from "./modules/ApplicationServices.mjs";

const appServices = new ApplicationServices();
const fileService = new FileServices();
const creds = await fileService.getFileJSON('creds');
// const jwtServices = new JWTServices();
// jwtServices

document.forms['loginForm'].addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.forms['loginForm'].username.value;
    const password = document.forms['loginForm'].password.value;

    if (Object.keys(creds).includes(username)) {
        if (creds[username].password == password) {
            appServices.setLocalItem('id', creds[username].id);
            window.location = '/profile/index.html';
        } else {
            alert("Incorrect password, please try again.")
        }
    } else {
        alert("Unknown username, please try another one.")
    }
})