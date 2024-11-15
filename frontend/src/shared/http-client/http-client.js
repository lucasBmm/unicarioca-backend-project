import axios from "axios";

class HttpClient {
  constructor(baseURL) {
    if (HttpClient.instance) {
      this.axiosInstance = HttpClient.instance.axiosInstance;
      return HttpClient.instance;
    }

    HttpClient.instance = this;
    this.axiosInstance = axios.create({ baseURL });

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
