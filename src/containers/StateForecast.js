import React, { useEffect } from "react";
import Forecast from "../components/Forecast";
import * as R from "ramda";
import { connect } from "react-redux";
import { selectors, actions } from "../reducers/forecast";

const StateForecast = connect(
  state => ({
    forecast: selectors.getForecast(state),
    loading: selectors.isLoadingFetchForecast(state),
    failure: selectors.getFailureFetchForecast(state),
    success: selectors.isSuccessFetchForecast(state)
  }),
  {
    fetchForecast: actions.fetchForecast,
    resetState: actions.resetState
  }
)(
  ({
    loading,
    failure,
    success,
    forecast,
    date,
    time,
    city,
    fetchForecast,
    resetState
  }) => {
    useEffect(() => {
      if (date && time && city) {
        fetchForecast({ date, time, city });
      }
      return () => {
        resetState();
      };
    }, [date, time, city, fetchForecast, resetState]);
    if (loading) {
      return <p>Loading forecast</p>;
    } else if (failure) {
      return <p>{failure}</p>;
    } else if (success) {
      if (!R.isEmpty(forecast)) {
        return <Forecast forecast={forecast} />;
      }
      return (
        <div className="alert alert-warning">
          <b>Warning:</b>No forecast available
        </div>
      );
    }
    return null;
  }
);

export default StateForecast;
