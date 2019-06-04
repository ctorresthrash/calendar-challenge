# calendar-challenge

This project is bootstraped with [create-react-app](https://github.com/facebook/create-react-app)

## Instructions

1. Clone this repo.
2. Run `npm install` or `yarn install` to install dependencies.
3. Run `npm start` or `yarn start` to run the application.
4. To test the `Add Reminder` functionality run `yarn test`

## About the tests

Since I encapsulated all the reminder validation in a single file, I just tested the validation function and tested that the react component won't trigger the `submitReminder` prop; which dispatches the actions, when the input value of the `ReminderForm` is not correct.

## About the [Open Weather Map](https://openweathermap.org/api) API

The only forecasting service I found available for a free account was the [5 days forecasting](https://openweathermap.org/forecast5); which only gets results within a scope of 5 days, if You select a date after those 5 days, the service won't respond any forecast, I just show a `forecast not found` message for these cases.

## About the bonus requirements.

I made all of them, the calendar supports all 12 month of the year, the year doesn't change; its value is the current year.

The reminders' container div scrolls when is overflowed by the reminders, so, You can see all your reminders.

You can delete each reminder by clicking the trash icon besides the reminder or delete all of the reminders of one day by clicking the trash icon besides the date in the calendar.

Last, but not least... I enjoyed a lot this challenge, thank you for this opportunity .