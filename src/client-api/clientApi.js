const rp = require("request-promise");
const token =
  "BQCCZDwHM6ApJBRSiSrnApq65T0JKR_AMOkvfrgf5Ft5D6G2HBoZ45uiK4PNOXvhKLEZ3kAqnqG7fh2aPis3nPFlBkk5LQqpv-CB7rcbWYNNJJpSMrW5UMIybre6tSlCNDIBC8BljsSQTAE";

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
