
const BASE_URL = 'https://localhost:8080/api';
// const BASE_URL = 'http://localhost:8080/api';

const getHeaders = () => {
    const getAppKey = () => "somerandomkey";
    const getToken = () => localStorage.getItem('accessToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
        'App-Key': getAppKey(),
    };
};

class ApiMethods {
    // Fetch wrapper for HTTP requests
    static async makeRequest({ method, url, data = null, headers }) {
        try {
            const response = await fetch(url, {
                method,
                body: data ? JSON.stringify(data) : null,
                headers,
            });

            const contentType = response.headers.get('Content-Type') || '';
            const responseBody = contentType.includes('application/json')
                ? await response.json().catch(() => null)
                : await response.text();

            return { response, responseBody };
        } catch (error) {
            console.error("Network Error:", error);
            throw { message: "Network error or server is unreachable", error };
        }
    }

    // Refresh token logic
    static async refreshToken() {

        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            console.log("Refresh token is Empty!");
            window.location.reload();
        }


        const { response, responseBody } = await this.makeRequest({
            method: 'POST',
            url: `${BASE_URL}/auth/refresh`,
            data: { refreshToken },
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            localStorage.removeItem('refreshToken');
            window.location.reload();
        }

        localStorage.setItem('accessToken', responseBody.accessToken);
        localStorage.setItem('refreshToken', responseBody.refreshToken);

        return responseBody.accessToken;
    }

    static async handleResponse({ response, responseBody, method, url, data }) {
        if (response.ok) return responseBody;

        const isAuthAPI = url.includes("/auth");

        // console.log(response);
        // console.log(url);

        if (response.status === 401 && !isAuthAPI) {
            try {
                await this.refreshToken();
                return this.apiRequest(method, url, data, false); // Retry the request
            } catch (error) {
            }
        }



        throw {
            status: response.status,
            statusText: response.statusText,
            error: responseBody,
        };
    }



    // Core API request method
    static async apiRequest(method, url, data, retry = true) {
        const fullUrl = `${BASE_URL}${url}`;
        const headers = getHeaders();

        const { response, responseBody } = await this.makeRequest({ method, url: fullUrl, data, headers });

        return this.handleResponse({ response, responseBody, method, url, data });
    }

    // Public methods for specific HTTP verbs
    static get(url) {
        return this.apiRequest('GET', url);
    }

    static post(url, data) {
        return this.apiRequest('POST', url, data);
    }

    static put(url, data) {
        return this.apiRequest('PUT', url, data);
    }

    static delete(url) {
        return this.apiRequest('DELETE', url);
    }
}

export default ApiMethods;
