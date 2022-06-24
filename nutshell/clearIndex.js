require("dotenv").config()
const algoliasearch = require("algoliasearch/lite")

const INDEX_NAME = 'products'
const ALGOLIA_APP_KEY = process.env.ALGOLIA_APP_KEY
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID

const client = algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_APP_KEY
)

const createIndex = async () => {
  const index = client.initIndex(INDEX_NAME)
  
  await index.clearObjects()

  // Searchable Attributes
  await index.setSettings({
    searchableAttributes: []
  });

  // Search Rating
  await index.setSettings({
    customRanking: []
  });

  // Facet Filters
  await index.setSettings({
    attributesForFaceting: []
  });

}

createIndex()
  .catch(err => console.log(err))