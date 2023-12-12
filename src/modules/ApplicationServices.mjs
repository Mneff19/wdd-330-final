export default class ApplicationServices {
    getLocalItem(key) {
        return localStorage.getItem(key);
    }
    
    setLocalItem(key, data) {
        localStorage.setItem(key, data);
    }
    
    deleteLocalStorage(key){
        if(localStorage.getItem(key)) {
            localStorage.removeItem(key);
        }
    }
}