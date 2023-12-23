import PropTypes from 'prop-types';
export default function fetchData({ url, method = 'GET', body }) {
  return fetch(url, {
    method,
    mode: 'cors',
    body,
  }).then(async (response) => {
    const responseJson =
      response.status === 200 ? await response.json() : response;
    if (response.ok) return responseJson;
    throw new Error(JSON.stringify(responseJson));
  });
}

fetchData.propTypes = {
  url: PropTypes.string,
};
