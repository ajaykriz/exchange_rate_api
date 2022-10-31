require("dotenv").config();
const axios = require("axios");
const apiKey = process.env.API_KEY;

const exchanger = async (req, res) => {
  const currency = req.body.currency;
  const amount = req.body.amount;
  const config = {
    headers: {
      apikey: apiKey,
    },
  };

  try {
    const response = await axios.get(
      `https://api.apilayer.com/exchangerates_data/convert?to=INR&from=${currency}&amount=${amount}`,
      config
    );
    const INR = response.data.result;

    const resp = await axios.get(
      "https://api.wazirx.com/sapi/v1/ticker/24hr?symbol=btcinr"
    );

    const btc = resp.data;
    const openPrice = INR * btc.openPrice;
    const lowPrice = INR * btc.lowPrice;
    const highPrice = INR * btc.highPrice;
    const lastPrice = INR * btc.lastPrice;
    const volume = btc.volume;
    const bidPrice = INR * btc.bidPrice;
    const askPrice = INR * btc.askPrice;

    const rates = {
      currency: currency,
      amount: amount,
      INR: INR,
      btc: {
        openPrice,
        lowPrice,
        highPrice,
        lastPrice,
        volume,
        bidPrice,
        askPrice,
      },
    };

    res.json(rates);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

module.exports = exchanger;
