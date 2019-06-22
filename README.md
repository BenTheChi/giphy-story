# giphy-story
Creates a gif storybook from text.  Start with 'npm start'

Features:
- Parses text input into sections according to punctuation and newlines
- Preloads the embed URLs for each GIF to be embedded at once using parallel promises
- Gives a random GIF for the homepage
- Has default GIF embed URLs in case the API call fails
- Tracks page number
- Load (non-functioning for now), create, story, and home pages

Future Features:
- More CSS and overall styling
- Load and save file
- Title and End page
- Start a random sample saved story
- GIF randomization so the same story doesn’t present the same GIFs
- Images for characters? Depends on if I can find a good image API.

Bugs/Design Flaws:
- Giphy sometimes doesn’t return a GIF for a search. Currently using default GIFs, but in the future I may try multiple attempts or a switch to a local image for reliability.
- Giphy limits my API calls to only 42 an hour and 1000 a day. So very easy to hit the limit with long stories. Will apply for a production API key in the future.
- UI/UX is basic and slapped together with bootstrap. I’m taking a course on CSS and will improve as my skills advance.
- GIFs are not consistent sizes and makes each slide layout look slightly different
