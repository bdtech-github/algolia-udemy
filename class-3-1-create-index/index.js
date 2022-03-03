require("dotenv").config()
const algoliasearch = require("algoliasearch/lite")

const REACT_APP_ALGOLIA_API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY
const REACT_APP_ALOGLIA_APP_ID = process.env.REACT_APP_ALOGLIA_APP_ID

const client = algoliasearch( 
  REACT_APP_ALOGLIA_APP_ID,
  REACT_APP_ALGOLIA_API_KEY
)

const index = client.initIndex("dev_TESTING")
index.setSettings({});