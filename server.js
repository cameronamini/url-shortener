const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const rateLimit = require("express-rate-limit");

const {PORT, MONGODB_URI} = require('./utils/config')

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(morgan("common"))
app.use(helmet());

const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })

  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)
  res.redirect(shortUrl.full)
})

app.listen(PORT || 3001);