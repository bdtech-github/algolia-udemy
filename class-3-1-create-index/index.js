//search only version of the api client, optimised for size and search:
require("dotenv").config()
const algoliasearch = require("algoliasearch/lite")

const REACT_APP_ALGOLIA_API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY
const REACT_APP_ALOGLIA_APP_ID = process.env.REACT_APP_ALOGLIA_APP_ID

//Initialise algolia client with app id and api key which you can find as you can see below
const client = algoliasearch( 
  REACT_APP_ALOGLIA_APP_ID,
  REACT_APP_ALGOLIA_API_KEY
)

const index = client.initIndex("dev_TESTING")
index.setSettings({});