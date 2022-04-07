import React from 'react';
import Hit from "./Hit"
import {
	Hits,
  InstantSearch,
  SearchBox,
  Stats
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
require("dotenv").config()


const REACT_APP_ALGOLIA_INDEX = "dev_Ecommerce";
const REACT_APP_ALGOLIA_API_SEARCH_KEY = process.env.REACT_APP_ALGOLIA_APP_KEY
const REACT_APP_ALOGLIA_APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID

const searchClient = algoliasearch(
  REACT_APP_ALOGLIA_APP_ID,
  REACT_APP_ALGOLIA_API_SEARCH_KEY
);

export default class App extends React.Component {
  render() {
    return (
        <div className="container">
         <InstantSearch
          indexName={REACT_APP_ALGOLIA_INDEX}
          searchClient={searchClient}
        >
          <SearchBox
            className="search-box"
          />
           <div className="products-container">
              <Stats translations={{
                  stats(nbHits, timeSpentMS) {
                    return nbHits > 0
                      ? `Products (${nbHits})`
                      : "no results found";
                  }
              }} />
              <Hits hitComponent={Hit} />
           </div>
        
        </InstantSearch>
      </div>
    );
  }
}

