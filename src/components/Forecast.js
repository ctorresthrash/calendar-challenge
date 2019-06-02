import React from "react";
import * as R from "ramda";
import "./Forecast.css";

const Forecast = ({ forecast }) => {
  const weather = R.pathOr(null, ["weather", "0"], forecast);
  return (
    <div className="alert alert-info">
      <b>Weather forecast: </b>
      {R.propOr("Not found", "description", weather)}
      {R.propOr(null, "icon", weather) && (
        <img
          alt=""
          src={`${process.env.REACT_APP_OPEN_WEATHER_BASE_URL}/img/w/${R.propOr(
            null,
            "icon",
            weather
          )}.png`}
        />
      )}
    </div>
  );
};

export default Forecast;
