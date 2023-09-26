require("dotenv").config('./.env')
const _ = require('lodash')
const algoliasearch = require("algoliasearch")

const INDEX_NAME = 'products'
const REACT_APP_ALGOLIA_API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY
const REACT_APP_ALOGLIA_APP_ID = process.env.REACT_APP_ALOGLIA_APP_ID

const algoliaClient = algoliasearch(
    REACT_APP_ALOGLIA_APP_ID,
    REACT_APP_ALGOLIA_API_KEY
)

const saveUsingChunks = async () => {   
    const index = algoliaClient.initIndex(INDEX_NAME) 
    let products = require('./products.json')
    products = products.slice(0, 1000)

    const chunks = _.chunk(products, 100)   
    await Promise.all(
      chunks.map(async chunk => await index.saveObjects(chunk, { autoGenerateObjectIDIfNotExist: true }))      
    )
      .then(result => console.log(result))                 
  }
  
  saveUsingChunks().catch(err => console.log(err))
