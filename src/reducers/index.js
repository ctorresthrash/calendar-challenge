import { combineReducers } from "redux";
import reminders from "./reminders";
import forecast from "./forecast";

const reducers = { reminders, forecast };

export default combineReducers(reducers);
