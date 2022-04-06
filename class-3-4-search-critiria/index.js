require("dotenv").config()
const algoliasearch = require("algoliasearch/lite")

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID
const ALGOLIA_APP_KEY = process.env.ALGOLIA_APP_KEY

const client = algoliasearch(
    ALGOLIA_APP_ID,
    ALGOLIA_APP_KEY
)

const run = async () => {
    const index = client.initIndex("dev_Ecommerce")
    await index.setSettings({
        searchableAttributes: ['name','brand','categories,hierarchicalCategories','type','unordered(description)']
    });
    
    const query = 'buy'
    const result = await index.search(query, { 'hitsPerPage': 5 })
    console.log(query, result.nbHits)
    result.hits.forEach(hit => {
        console.log(hit)
    });
}

run().catch(err => console.log(err))

