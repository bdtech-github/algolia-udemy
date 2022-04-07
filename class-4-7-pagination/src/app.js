import React from 'react';
import Hit from "./Hit"
import {
  Hits,
  InstantSearch,
  SearchBox,
  Stats,
  RefinementList,
  ClearRefinements,
  Configure,
  Pagination
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
          <Configure hitsPerPage={6} />
          <SearchBox
            className="search-box"
          />
          <div className="results-container">
            <div className="sidebar">
              <ClearRefinements
                translations={{
                  reset: "Clear All",
                }}
                clearsQuery
              />
              <div className="category">
                <h3>Brand</h3>
                <RefinementList
                  attribute="brand"
                  transformItems={(items) => {
                    return items.map((item) => {
                      return {
                        ...item,
                        brand: `${item.brand} (${item.count})`,
                      };
                    });
                  }}
                />
                <h3>Price Range</h3>
                <RefinementList
                  attribute="price_range"
                  transformItems={(items) => {
                    return items.map((item) => {
                      return {
                        ...item,
                        brand: `${item.price_range} (${item.count})`,
                      };
                    });
                  }}
                />
                <h3>Type</h3>
                <RefinementList
                  attribute="type"
                  transformItems={(items) => {
                    return items.map((item) => {
                      return {
                        ...item,
                        type: `${item.type} (${item.count})`,
                      };
                    });
                  }}
                />
              </div>
            </div>

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
          </div>

          <Pagination className="toolbar" totalPages={10} />

        </InstantSearch>
      </div>
    );
  }
}

