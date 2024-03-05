# MASH

A project that plays [MASH](https://www.youtube.com/watch?v=ZoiZwWW1qao)

## Decisions/Rationale

### Technical

- I decided to use React and Vite. This is an ecosystem I have a lot of experience with and is super easy to setup
- I decided to use Tailwind for styling as its quick and easy to get setup and I am familiar with it
- The app is primarily spead across three files
  - `CreateGame`: The initial screen shown where a user can enter their categories and options
  - `PlayGame`: The automatic run through of choosing the options
  - `App`: A wrapper around the two other files
- I decided not to use routing here and instead keep it all in one page. If building this professionally, I would use routing where each game is given a specific `gameId` and it would run on `/game/:id`
- I used flowbite for the base of the input and button components. I would usually build them myself to allow for more customisability, but for a simple and quick MVP like this, there is no time in spending time on such small things.
- The game data is stored in localstorage. Although not completely neccesary, this saves the data in case of an accidental refresh. Losing data on refresh is frustrating and its very easy to do on touch devices - which I would expect to be the main type of devices used by children.
- I did not do incremental commits of this code, nor follow a good source control protocol. If I was building this in a production environment I definitely would, but sometimes you have to focus on speed over best practices when producing an MVP like this.

### Product

- I allowed the whole game to be editable, so the user can create their own categories and options, including choosing how many options they have. This allows for more use cases and fun than if I had hardcoded the categories.
- I added some nice little features like "reset" and "play again".
- I have included a "development tools" section that autofills a decent sized game. I like putting shortcuts like this which would only show up on development to allow manual testing easier.
- I included a light and dark mode. This comes prebuilt with flowbite and tailwind, so gives its 1 line of code, it felt like a nice little addition.
- I randomly generate a Magic number between 1 and 10. This allows playing the same game multiple times easily.

### Future considerations

- Generating a Magic number may take away some of the fun. I would either allow the user to enter the number themselves, or do some form of like dice animation to show them how its been generated.
- I would want to pull the algorithm out and write some unit tests on it to validate it gives the correct result.
- The app is styled in a way where it will work fine across mobile and desktop, but it could be nicer on both.
- As mentioned above, I would add a simple router to make things like the browser `back` button work better. Also to allow saving of results by id.
- I would do a better file structure than just having everything flat. I started that with the `/components` - but having a `/pages/game/PlayGame` would make sense if moving to a proper router setup.
