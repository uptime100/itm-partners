import { post } from 'utils/api';
import queryString from 'querystring';
import { setToken } from 'utils/token';

const refreshToken = async _refreshToken => {
  let response = await post(
    '/oauth/token',
    queryString.stringify({
      grant_type: 'refresh_token',
      refresh_token: _refreshToken,
      client_id: 'partners',
      client_secret: 'secret',
    }),
  );

  if (response.status === 200) {
    setToken(response.data);
  }
};

export default refreshToken;
