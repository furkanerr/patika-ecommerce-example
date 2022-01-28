import axios from "axios";

axios.interceptors.request.use(
	function (config) {
		const { origin } = new URL(config.url);

		const allowedOrigins = ["http://localhost:4000"];
		const token = localStorage.getItem("access-token");

		if (allowedOrigins.includes(origin)) {
			config.headers.authorization = token;
		}
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

export default class eCommericalServices {
  static async GetProducts({ pageParam = 1 }) {
    const { data } = await axios.get(
      `http://localhost:4000/product?page=${pageParam}`
    );
    return data;
  }

  static async GetProductDetail(product_id) {
    const { data } = await axios.get(
      `http://localhost:4000/product/${product_id}`
    );
    return data;
  }

  static async Register(input) {
    const { data } = await axios.post(
      `http://localhost:4000/auth/register`,
      input
    );

    return data;
  }
  static async fetchMe() {
    const { data } = await axios.get(`http://localhost:4000/auth/me`);
    return data;
  }
  static async fetchLogin(input) {
    const { data } = await axios.post(
      `http://localhost:4000/auth/login`,
      input
    );
    return data;
  }

  static async logOut() {
    const { data } = await axios.post(`http://localhost:4000/auth/logout`, {
      refresh_token: localStorage.getItem("refresh-token"),
    });
    return data;
  }


  static async postOrder(payload) {
    const {data} = await axios.post('http://localhost:4000/order',payload);
    return data;
  }
}
