const rp = require("request-promise");
const token = process.env.REACT_APP_API_TOKEN;

const clientApi = {
  baseUrl() {
    return `https://api.spotify.com/v1`;
  },

  call(method, path, body, token) {
    const options = {
      method,
      url: `${this.baseUrl()}/${path}`,
      json: true,
    };

    if (body) options.body = body;
    if (token) options.headers = { authorization: `Bearer ${token}` };

    return rp(options);
  },

  getCategories() {
    return this.call("GET", `browse/categories?country=ES`, undefined, token);
  },

  getPlaylists(category) {
    return this.call(
      "GET",
      `browse/categories/${category}/playlists?country=ES&limit=10`,
      undefined,
      token
    );
  },
};

export default clientApi;
