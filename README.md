# URL Shortner

## About:
This project is a result of a challenge to myself to see how quickly I could hack together a REST API. 

It's a URL shortener that makes use of ejs as a templating engine, an npm package named 'shortid' to generate the shortened urls and uses mongodb(w/ mongoose) for persistence. It also features logging, security, and rate limiting middleware. 

## Usage: 
```
# Clone this repository
$ git clone https://github.com/cameronamini/url-shortener

# Go into the repository
$ cd url-shortener

# Install dependencies
$ npm install

# Run the app
$ node server.js
```