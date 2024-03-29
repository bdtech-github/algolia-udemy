import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch
} from "react-instantsearch-dom";


const REACT_APP_ALGOLIA_INDEX = "dev_Ecommerce";
const REACT_APP_ALGOLIA_API_SEARCH_KEY = process.env.REACT_APP_ALGOLIA_APP_KEY
const REACT_APP_ALOGLIA_APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID

const searchClient = algoliasearch(
  REACT_APP_ALOGLIA_APP_ID,
  REACT_APP_ALGOLIA_API_SEARCH_KEY
);

const App = () => {
  console.log(searchClient)
  return (
     <div>
        <InstantSearch 
          indexName={REACT_APP_ALGOLIA_INDEX}
          searchClient={searchClient}
        >
          <p>View the searchClient logged in the console</p>
          {/* Children Components */}
        </InstantSearch>
      </div>
  );
}
export default App;