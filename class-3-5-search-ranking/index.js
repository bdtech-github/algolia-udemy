require("dotenv").config()
const algoliasearch = require("algoliasearch/lite")

const REACT_APP_ALGOLIA_API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY
const REACT_APP_ALOGLIA_APP_ID = process.env.REACT_APP_ALOGLIA_APP_ID

const client = algoliasearch(
    REACT_APP_ALOGLIA_APP_ID,
    REACT_APP_ALGOLIA_API_KEY
)

const run = async () => {
    const index = client.initIndex("dev_TESTING")
    await index.setSettings({
        customRanking: ['desc(price)','desc(free_shipping)','asc(popularity/rating)']
    });
    
    const query = 'buy'
    const result = await index.search(query, { 'hitsPerPage': 5 })
    console.log(query, result.nbHits)
    result.hits.forEach(hit => {
        //console.log(hit)
    });
}

run().catch(err => console.log(err))

