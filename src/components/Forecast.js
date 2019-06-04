import React from "react";
import * as R from "ramda";
import "./Forecast.css";
import { getOpenWeatherBaseUrl } from "../util";

const Forecast = ({ forecast }) => {
  const weather = R.pathOr(null, ["weather", "0"], forecast);
  return (
    <div className="alert alert-info">
      <b>Weather forecast: </b>
      {R.propOr("Not found", "description", weather)}
      {R.propOr(null, "icon", weather) && (
        <img
          alt=""
          src={`${getOpenWeatherBaseUrl()}/img/w/${R.propOr(
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
