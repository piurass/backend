class ChainApi {
    static init() {
        const baseUrl = 'http://localhost:5001';
        const headers = 'Content-Type: application/json';

        return { baseUrl, headers };
    }
}

export default ChainApi;
