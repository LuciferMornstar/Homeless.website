const express = require('express');
const ccxt = require('ccxt');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Configure EJS view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());

// Serve static assets (css, js, images)
app.use(express.static(path.join(__dirname, 'assets')));

// Serve frontend static files
app.use(express.static(path.join(__dirname)));

app.get('/api/price/:exchange', async (req, res) => {
  const exchangeParam = req.params.exchange;
  const rawPair = req.query.pair;
  if (!rawPair) {
    return res.status(400).json({ error: 'Missing pair' });
  }
  // Manual HTTP fetch for Coinbase public spot price
  if (exchangeParam === 'coinbase') {
    try {
      const symbol = rawPair.replace(/USDT$/i, '-USD');
      const url = `https://api.coinbase.com/v2/prices/${symbol}/spot`;
      const response = await axios.get(url);
      const data = response.data;
      return res.json({ price: parseFloat(data.data.amount) });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  // Use CCXT for other exchanges
  const exchangeId = req.params.exchange;
  if (!ccxt[exchangeId]) {
    return res.status(400).json({ error: 'Unsupported exchange' });
  }
  try {
    const client = new ccxt[exchangeId]();
    const market = rawPair.includes('/')
      ? rawPair
      : `${rawPair.slice(0, -4)}/${rawPair.slice(-4)}`;
    const ticker = await client.fetchTicker(market);
    res.json({ price: ticker.last });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unified orderbook depth endpoint
app.get('/api/depth/:exchange', async (req, res) => {
  const exchangeParam = req.params.exchange;
  const rawPair = req.query.pair;
  const exchangeId = exchangeParam === 'coinbase' ? 'coinbasepro' : exchangeParam;
  if (!ccxt[exchangeId] || !rawPair) {
    return res.status(400).json({ error: 'Unsupported exchange or missing pair' });
  }
  try {
    const client = new ccxt[exchangeId]();
    // Construct market symbol; convert USDT -> USD for Coinbase Pro
    let market;
    if (exchangeId === 'coinbasepro') {
      const base = rawPair.replace(/USDT$/i, '');
      market = rawPair.includes('/')
        ? rawPair.replace(/USDT/i, 'USD')
        : `${base}/USD`;
    } else {
      market = rawPair.includes('/')
        ? rawPair
        : `${rawPair.slice(0, -4)}/${rawPair.slice(-4)}`;
    }
    const orderbook = await client.fetchOrderBook(market, 5);
    const bid = orderbook.bids.length ? orderbook.bids[0][0] : null;
    const ask = orderbook.asks.length ? orderbook.asks[0][0] : null;
    res.json({ bid, ask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to list dog images from assets/dogs
app.get('/api/dogs', async (req, res) => {
  try {
    const dirPath = path.join(__dirname, 'assets', 'dogs');
    const files = await fs.promises.readdir(dirPath);
    const images = files.filter(f => /\.(jpe?g|png|gif)$/i.test(f));
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dynamic page routing: render EJS views matching URL path (captures any path as 'view')
app.get('/:view(*)', (req, res, next) => {
  const view = req.params.view || 'index';
  res.render(view, (err, html) => {
    if (err) return next();
    res.send(html);
  });
});

app.listen(port, () => console.log(`ArbiBot API server listening on port ${port}`));