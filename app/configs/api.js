const API =
  window.location.hostname === 'dev.intimate.parners' ||
  window.location.hostname === 'partners.intimate.io'
    ? 'https://dev-api.intimate.online'
    : 'http://localhost:3000';

export default API;
