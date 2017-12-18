import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import React, { Component } from 'react';
import Search from '../search_bar/Search.component';
import config from '../../config';
import './App.component.css';


const appId = config['APP_ID'],
      apiKey = config['API_KEY'],
      restListIndex = config['LIST_INDEX'],
      restInfoIndex = config['INFO_INDEX'];


class App extends Component {
  constructor() {
    super();
    this.initAlgoliaClient();
  }

  initAlgoliaClient() {
    const client = algoliasearch(appId, apiKey);
    this.restaurantListHelper = algoliasearchHelper(
      client, restListIndex, {
        hitsPerPage: 3
      }
    );
    this.restaurantInfoHelper = algoliasearchHelper(
      client, restInfoIndex, {
        hitsPerPage: 1
      }
    );
  }

  render() {
    return (
      <div className="app">
        <Search
          listHelper={this.restaurantListHelper}
          infoHelper={this.restaurantInfoHelper}
        />
      </div>
    );
  }
}

export default App;

/*
const indexName = 'bestbuy';

const client = algoliasearch(appId, apiKey);
const helper = algoliasearchHelper(
  client, indexName, {
    disjunctiveFacets: ['category'],
    hitsPerPage: 7,
    maxValuesPerFacet: 3
  }
);

const Provider = reactAlgoliaSearchHelper.Provider;
const connect = reactAlgoliaSearchHelper.connect;

const SearchBox = connect()(
  ({helper}) =>
  <input
    className="search-box"
    placeholder="Search here"
    onChange={e => helper.setQuery(e.target.value).search()}
  />
);

const getHighlighted = s => ({__html: s});

const Hit = ({
  _highlightResult: {
    name: {
      value: name
    }
  }
}) => <div dangerouslySetInnerHTML={getHighlighted(name)}/>;

const Hits = connect(
  state => ({results: state.searchResults})
)(
  ({results}) => results &&
  <div className="results">
    {results.hits.map(hit => <Hit key={hit.objectID} {...hit} />)}
  </div>
);

const Category = ({
  name,
  count,
  isRefined,
  handleClick
}) =>
<li>
  <label>
    <input
      type="checkbox"
      checked={isRefined}
      value={name}
      onChange={handleClick}
    />
    {name}{' '}
    <span className="badge">{count}</span>
  </label>
</li>;

const Categories = connect(
  state => ({
    categories: state.searchResults &&
      state.searchResults.getFacetValues('category', {sortBy: ['count:desc', 'selected']}) ||
      []
  })
)(
  ({categories, helper}) =>
<ul className="categories">
  {categories.map(
    category =>
      <Category
        key={category.name}
        {...category}
        handleClick={e => helper.toggleRefine('category', category.name).search()}
      />
  )}
</ul>
);

const Pagination = connect(
  ({searchResults}) => (
    searchResults === null ?
      {page: 0, nbPages: 0} :
      {page: searchResults.page, nbPages: searchResults.nbPages}
  )
)(
  ({page, nbPages, helper}) =>
  <div className="pager">
    <button className="previous" onClick={e => helper.setPage(page - 1).search()} disabled={page === 0}>Previous</button>
    <span className="current-page">
      {page + 1}
    </span>
    <button className="next" onClick={e => helper.setPage(page + 1).search()} disabled={page + 1 >= nbPages}>Next</button>
  </div>
);

const App = () =>
<Provider helper={helper}>
  <div className="app">
    <SearchBox />
    <Categories />
    <Hits />
    <Pagination />
  </div>
</Provider>;
ReactDOM.render(<App />, document.querySelector('#root'));

helper.search();
*/