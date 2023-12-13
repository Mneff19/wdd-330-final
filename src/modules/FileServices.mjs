export default class FileServices {
    async getFileJSON(filename) {
        try {
            const response = await fetch(`https://mneff19.github.io/wdd-330-final/public/${filename}.json`);
            return response.json();
        } catch (e) {
            // File ${filename}.json could not be found or did not contain valid JSON;
            console.error(e);
        }
    }
}