import { createActions, handleActions } from "redux-actions";
import { payloadIdentity, loadingMutation } from "../util/redux";
import Axios from "axios";
import * as R from "ramda";
import { parse, differenceInDays } from "date-fns";
import { createSelector } from "reselect";
import { getOpenWeatherBaseUrl } from "../util";

const OPEN_WEATHER_API_KEY = "c50d82d239feff96cee0695ce898171e";

Axios.defaults.baseURL = getOpenWeatherBaseUrl();
Axios.defaults.timeout = 30000;
Axios.defaults.headers.post["Content-Type"] = "application/json";
Axios.defaults.withCredentials = false;

const createdActions = createActions({
  forecast: {
    FETCH_FORECAST_ATTEMPT: null,
    FETCH_FORECAST_FAILURE: payloadIdentity("failureMessage"),
    FETCH_FORECAST_SUCCESS: null,
    SET_FORECAST: payloadIdentity("forecast"),
    RESET_STATE: null
  }
}).forecast;

const getValueFromStore = value =>
  createSelector(
    state => state.forecast,
    state => {
      return state[value];
    }
  );

export const selectors = {
  getForecast: getValueFromStore("forecast"),
  isLoadingFetchForecast: getValueFromStore("loadingFetchForecast"),
  getFailureFetchForecast: getValueFromStore("failureFetchForecast"),
  isSuccessFetchForecast: getValueFromStore("successFetchForecast")
};

export const actions = {
  ...createdActions,
  fetchForecast: ({ city, date, time }) => dispatch => {
    const {
      fetchForecastAttempt,
      fetchForecastFailure,
      fetchForecastSuccess,
      setForecast
    } = createdActions;
    dispatch(fetchForecastAttempt());
    const reminderDate = parse(`${date} ${time}`.trim());
    return Axios({
      method: "GET",
      url: `/data/2.5/forecast?q=${city}&appid=${OPEN_WEATHER_API_KEY}`
    })
      .then(response => {
        const forecastList = R.pathOr([], ["data", "list"], response);
        const closestForecast = forecastList.reduce(function(prev, curr) {
          const currentDate = parse(curr.dt_txt);
          const previousDate = parse(prev.dt_txt);
          return Math.abs(currentDate - reminderDate) <
            Math.abs(previousDate - reminderDate)
            ? curr
            : prev;
        });
        dispatch(
          setForecast(
            differenceInDays(parse(closestForecast.dt_txt), reminderDate) === 0
              ? closestForecast
              : null
          )
        );
        dispatch(fetchForecastSuccess());
      })
      .catch(error => {
        dispatch(
          fetchForecastFailure(
            R.pathOr(
              "Forecast not found",
              ["response", "data", "message"],
              error
            )
          )
        );
      });
  }
};

const initialState = {
  loadingFetchForecast: false,
  failureFetchForecast: null,
  successFetchForecast: false,
  forecast: null
};

export default handleActions(
  {
    forecast: {
      FETCH_FORECAST_ATTEMPT: loadingMutation({
        type: "loading",
        name: "FetchForecast"
      }),
      FETCH_FORECAST_FAILURE: loadingMutation({
        type: "failure",
        name: "FetchForecast"
      }),
      FETCH_FORECAST_SUCCESS: loadingMutation({
        type: "success",
        name: "FetchForecast"
      }),
      SET_FORECAST: (state, action) => {
        return { ...state, forecast: action.payload.forecast };
      },
      RESET_STATE: state => {
        return { ...state, ...initialState };
      }
    }
  },
  initialState
);
