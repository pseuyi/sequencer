'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')

const app = express()
  // Logging middleware (dev only)
  app.use(require('volleyball'))


module.exports = app
  // We'll store the whole session in a cookie

  // Body parsing middleware
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  
  // Serve static files from ../public
  .use(express.static(resolve(__dirname, '..', 'public')))

  // Serve static javascript from ../js
  .use(express.static(resolve(__dirname, '..', 'js')))

  // Serve our api
//   .use('/api', require('./js'))

  // Send index.html for anything else.
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

if (module === require.main) {
  // Start listening only if we're the main module.
  // 
  // https://nodejs.org/api/modules.html#modules_accessing_the_main_module
  const server = app.listen(
    process.env.PORT || 1337,
    () => {
    //   console.log(`--- Started HTTP Server for ${pkg.name} ---`)      
      console.log(`Listening on ${JSON.stringify(server.address())}`)
    }
  )
}

