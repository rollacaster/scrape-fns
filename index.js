const fs = require('fs')
const axios = require('axios')
const jsdom = require('jsdom')
const { fromPromise } = require('crocks/Async')
const { curry, binary, map, compose, prop } = require('crocks')

const { JSDOM } = jsdom

exports.writeFileSync = curry(binary(fs.writeFileSync))

exports.nodeListMap = f => nodeList => {
  const result = []
  for (let element of nodeList.values()) {
    result.push(f(element))
  }
  return result
}

exports.$ = selector => html =>
  new JSDOM(html).window.document.querySelectorAll(selector)

exports.get = url =>
  compose(map(prop('data')), fromPromise(() => axios.get(url)))
