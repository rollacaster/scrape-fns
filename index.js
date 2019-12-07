const axios = require('axios')
const jsdom = require('jsdom')
const { fromPromise } = require('crocks/Async')
const { map, compose, prop } = require('crocks')

const { JSDOM } = jsdom

exports.$ = selector =>
  compose(Array.from, html =>
    new JSDOM(html).window.document.querySelectorAll(selector)
  )

exports.get = url =>
  compose(map(prop('data')), fromPromise(() => axios.get(url)))
