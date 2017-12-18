# Algolia Search Implementer

### Notes on setup / project structure
This application was created with the create-react-app commandline tool. `registerServiceWorker.js` came with this setup, and you can read their documentation for more information about the setup and deployment features of it.

### Notes on data / indexes
I imported the data directly from the resources folder into the Algolia UI, rather than via API.

On reflection, I would have parsed the .csv file prior to uploading, as this added a lot of complexity to accessing the additional data table.

The current implementation uses the structure of the direct UI imports.

### Notes on features / fixes
Due to the amount of time spent on this challenge, I left a few things from the checklist / feature-list undone.
There are notes in individual files (in comment TODOs) that show where I would change some things.
To summarize:
1. Search and Filter are independent --> they need to run together --> ideally, I would be passing in a filter and a search query each time I performed a search, rather than performing separate functions for searches and filters
2. Mobile design --> there are a lot of issues in the mobile view, that I would fix by adding mobile css classes (i.e. separate widths for mobile screen sizes)
3. Data structure --> as noted above, I didn't parse the `restaurant_info.csv` file before uploading it --> with more time, I would re-upload this data and therefore be able to refactor the Aloglia requests and response parsing to be more streamlined and DRY
4. Missing card options --> I would add Diner's Club and Carte Blanche to the matches for Discover cards
5. Ratings / stars --> These should always be displayed in the correct order, and the number of stars is a little off, so I would debug this (ie. 0 stars is missing and 5 stars is visible twice)
6. Show More --> I would look at the API to see if I could just searching the same thing but view different pages of the results each time
7. DRYness --> with the above implemented, I would return to the methods implemented and refactor for DRYness
