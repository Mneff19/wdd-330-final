export default class FileServices {
    constructor() {
    }

    async getFileJSON(filename) {
        try {
            const response = await fetch(`../public/${filename}.json`);
            return response.json();
        } catch (e) {
            // File ${filename}.json could not be found or did not contain valid JSON;
            console.error(e);
        }
    }
}