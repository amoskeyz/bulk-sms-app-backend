const axios = require('axios').default;

const url = process.env.SMS_URL;

export default {
  sendMessage: async (text, from, to) => {
    const qq = await axios.get(`${url}&sender=${from}&recipient=${to}&message=${text}`)
      .then((response) => response.data)
      .catch((error) => error)
      .finally(() => {
        // always executed
      });
    return qq;
  }
};
