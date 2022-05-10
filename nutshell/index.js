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

  // Searchable Attributes
  await index.setSettings({
    searchableAttributes: ['name', 'brand', 'categories,hierarchicalCategories', 'type', 'unordered(description)']
  });

  // Search Rating
  await index.setSettings({
    customRanking: ['desc(price)', 'desc(free_shipping)', 'asc(popularity/rating)']
  });

  // Facet Filters
  await index.setSettings({
    attributesForFaceting: ["price_range","type","brand"]
  });

}

const search = async () => {
  const query = 'mac'
  const result = await index.search(query, { 'hitsPerPage': 5 })
  console.log(query, result.nbHits)
  result.hits.forEach(hit => {
    console.log(hit)
  });
}

createIndex()
  .catch(err => console.log(err))