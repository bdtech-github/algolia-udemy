require("dotenv").config()
const algoliasearch = require("algoliasearch/lite")

const INDEX_NAME = 'products'
const ALGOLIA_APP_KEY = process.env.ALGOLIA_APP_KEY
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID

const client = algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_APP_KEY
)

const ensureIndexConfig = async () => {
  const index = client.initIndex(INDEX_NAME)

  // Searchable Attributes
  await index.setSettings({
    "minWordSizefor1Typo": 4,
    "minWordSizefor2Typos": 8,
    "hitsPerPage": 30,
    "maxValuesPerFacet": 100,
    "searchableAttributes": [
      "name",
      "brand",
      "type",
      "categories,hierarchicalCategories",
      "unordered(description)"
    ],
    "numericAttributesToIndex": null,
    "attributesToRetrieve": null,
    "unretrievableAttributes": null,
    "optionalWords": null,
    "attributesForFaceting": [
      "price_range",
      "type",
      "brand"
    ],
    "attributesToSnippet": null,
    "attributesToHighlight": null,
    "paginationLimitedTo": 1000,
    "attributeForDistinct": null,
    "exactOnSingleWordQuery": "attribute",
    "ranking": [
      "typo",
      "geo",
      "words",
      "filters",
      "proximity",
      "attribute",
      "exact",
      "custom"
    ],
    "customRanking": [
      "desc(price)",
      "desc(free_shipping)",
      "asc(popularity/rating)"
    ],
    "separatorsToIndex": "",
    "removeWordsIfNoResults": "none",
    "queryType": "prefixLast",
    "highlightPreTag": "<em>",
    "highlightPostTag": "</em>",
    "snippetEllipsisText": "",
    "alternativesAsExact": [
      "ignorePlurals",
      "singleWordSynonym"
    ]
  });

}

ensureIndexConfig()
  .catch(err => console.log(err))