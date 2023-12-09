export default class APIServices {
    constructor(url) {
        this.url = url;
    }

    async apiFetch() {
        try {
            const response = await fetch(this.url);
            if (response.ok) {
                const data = await response.json();
                return data.list;
            } else {
                throw Error(await response.text());
            }
        } catch (e) {
            console.error(e);
        }
    }
}