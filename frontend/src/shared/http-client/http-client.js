import axios from "axios";

class HttpClient {
  constructor(baseURL) {
    // Check if an instance already exists
    if (HttpClient.instance) {
      this.axiosInstance = HttpClient.instance.axiosInstance;
      return HttpClient.instance;
    }

    // Create a new instance if it doesn't exist
    HttpClient.instance = this;
    this.axiosInstance = axios.create({ baseURL });

    // Add request interceptor for authorization
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  async get(url, config) {
    return this.axiosInstance.get(url, config);
  }

  async post(url, data, config) {
    return this.axiosInstance.post(url, data, config);
  }

  async put(url, data, config) {
    return this.axiosInstance.put(url, data, config);
  }

  async delete(url, config) {
    return this.axiosInstance.delete(url, config);
  }
}

const httpClient = new HttpClient("http://localhost:5000/");
export default httpClient;
