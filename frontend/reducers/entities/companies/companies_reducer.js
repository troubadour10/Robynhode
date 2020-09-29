import { 
  RECEIVE_QUOTE, 
  RECEIVE_QUOTES, 
  RECEIVE_COMPANY, 
  RECEIVE_INTRADAY_PRICES, 
  // RECEIVE_BATCH_INTRADAY_PRICES,
  RECEIVE_HISTORICAL_PRICES, 
  // RECEIVE_SEARCH_RESULTS
} from '../../../actions/companies/company_actions';


const companiesReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_QUOTE:
      const quote = action.quote;
      const merged = Object.assign({}, newState[quote.symbol], quote); // merge company info and company quote
      debugger
      return Object.assign({}, { [quote.symbol]: merged });
    case RECEIVE_QUOTES:
      const quotes = action.quotes;
      Object.values(quotes).forEach(nQuote => {
        const quote = Object.values(nQuote)[0];
        const iPrice = Object.values(nQuote)[1];
        newState[quote.symbol] = quote;
        newState[quote.symbol].intradayPrices = iPrice;
      });
      // debugger
      return newState;
    case RECEIVE_COMPANY:
      const company = { [action.company.symbol]: action.company };
      return Object.assign({}, newState, company);
    case RECEIVE_INTRADAY_PRICES:
      newState[action.symbol].intradayPrices = action.prices;
      return newState; 
    // case RECEIVE_BATCH_INTRADAY_PRICES:
    //   Object.values(newState).forEach(company => {
    //     const mergeIntra = Object.assign({}, newState[company.symbol], action.prices[company.symbol]);
    //     newState[company.symbol] = mergeIntra;       
    //   });
    //   return newState;
    case RECEIVE_HISTORICAL_PRICES:
      Object.values(newState).forEach(company => {
        const mergeHist = Object.assign({}, newState[company.symbol], action.prices[company.symbol]);
        newState[company.symbol] = mergeHist;
      });
      // debugger
      return newState;
    // case RECEIVE_SEARCH_RESULTS:
    //   action.results.forEach(result => {
    //     if (result.region === 'US') {
    //       const merged = Object.assign({}, newState[result.symbol], result);
    //       newState[result.symbol] = merged;
    //     }
    //   });
    //   // debugger
    //   return newState;
    default:
      return state;
  }
};

export default companiesReducer;