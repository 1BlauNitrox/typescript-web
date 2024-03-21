class ApiClient {
    constructor(baseURL) {
      this.baseURL = baseURL;
    }
  
    async get(route, params) {
        const url = new URL(route, this.baseURL);
        if (params) {
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        }
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`GET ${url} failed with status ${response.status}`);
            const text = await response.text();
            console.error(`Response text: ${text}`);
            throw new Error(`GET ${url} failed with status ${response.status}`);
        }
        try {
            return await response.json();
        } catch (error) {
            console.error(`Error parsing JSON: ${error}`);
            throw new Error('Invalid JSON response from server');
        }
    }
    
  
    async post(route, formData) {
      const url = new URL(route, this.baseURL);
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error(`POST ${url} failed with status ${response.status}`);
      }
      return response.json();
    }
  
    async put(route, formData) {
      const url = new URL(route, this.baseURL);
      const response = await fetch(url, {
        method: 'PUT',
        body: formData
      });
      if (!response.ok) {
        throw new Error(`PUT ${url} failed with status ${response.status}`);
      }
      return response.json();
    }
  }
  
// Example usage:
const api = new ApiClient('http://localhost:8000');

// GET request example
//api.get('/api/hello') // Requesting '/api/hello'
 // .then(data => console.log(data))
 // .catch(error => console.error(error));