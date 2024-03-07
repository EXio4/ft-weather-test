# FT-Weather-App

Simple weather app.

## Things to "fix" (never) / missing functionality

- UI sucks (it's ugly & doesn't handle user preferences)
- search seems to misbehave
- missing tests


## Current UX Workflow

* You are asked at start-up for your OpenWeatherMap API key

![screenshot of web app asking api key prompt](docs/S1_InsertAPIKey.png)

* You will be dropped into the main UI - your current location will be guessed and added to the list

![screenshot of web app with no location selected, but sidebar being filled with the current location](docs/S2_DefaultUI.png)

* You can select it!

![screenshot of web app with default location selected](docs/S3_SelectedDefault.png)

* You search type on search, and get results (it's buggy but, good enough!)

![cropped screenshot of search showing no results](docs/S4_SearchSelect.png)
![cropped screenshot of search showing results for London](docs/S5_SearchResults.png)

* ... and you get to see more locations!

![screenshot of web app on safari showing the weather in london](docs/S6_London.png)