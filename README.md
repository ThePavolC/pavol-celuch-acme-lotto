# ACME Lottery

## Description
Lottery app where registered users can participate in a daily lottery by getting a ballot.
The winner is picked every day at the midnight and the new lottery is started the next day.

## Technical description
The application consists of two parts, Django server and React client.

Django application is only using a local SQLite database.
React application is build using [Webpack][webpack].

### Django server
Backend is using [Django Rest Framework][drf] to expose a few API endpoints for the client to interact with. It is also serving a client application and has a code run the scheduled tasks.

#### API Endpoints
The app has following endpoints:
- `/admin` - this is a default Django admin page used by "admin" users
- `/access` - used for login/signup
- `/api/ballot` - used for CRUD ballot operations
- `/api/ballot/my` - used to get user's ballots
- `/api/lottery/active` - used to get an active lottery
- `/api/lottery-winner` - used to get a lottery winner
- `*` (empty) - used to show frontend

All API endpoints are only accessible with the token. User receives token after login.

#### Models

##### `User`
Django `User` model.

##### `Ballot`
This is a ticket that users can get to participate in a lottery.

Fields:
- `user`
- `lottery`
- `created`

##### `Lottery`
This is the lottery game.

Fields:
- `name`
- `prize`
- `ballots` (points to `User`)
- `created`

##### `LotteryWinner`
The lottery winner is stored in this table.

There is a unique constraint on the both fields.

Fields:
- `lottery`
- `user`

#### Static content
Django application serves the `index.html` template where the `main.js` bundle is rendered. I am using [webpack_loader][wloader] to render the application.

This main Javascript file is built by [Webpack][webpack] from the client app.

#### Scheduled task
There are 2 scheduled tasks that run closely after each other.

- `StartNewLottery` - creates a new lottery each day
- `PickLotteryWinner` - pick a random winner for he today's active lottery

To schedule the tasks I am using [django_cron][dcron]. To execute the tasks one needs to schedule a Cron job to execute a Django command which runs the tasks.

##### Cron job configuration
Here is the Cron job configuratio which runs every 5 mins (default from the website documentation) and executes `runcrons` command.

Since Cron is using a very basic shell, you need to load your Bash configuration, then load Python environment and only then you can execute the commmand.

Here is an example of Cron job:
```
> crontab -e
*/5 * * * * source /<HOME>/.bashrc && source /<VENV>/bin/activate && poetry run python /<PROJECT>/backend/manage.py runcrons > /PROJECT/cronjob.log
```

## React client
Client application is build in React with Bootstrap UI components from [react-bootstrap][rb] library and [react-datepicker][rdate].
For the application routing I am using [react-router][router].

For the API requests I am using [axios][axios] library.

Application consists of multiple pages.
- Login/Signup - anyone can signup and then login
- Home page - just a simple page
- Lottery - displays an active lottery and the past lotteries
- My Ballots - shows all my ballots
- Admin - just a link to Django admin page (this is visible only to admin users)
- API - just a link to Django Rest Framework API view (this is visible only to admin users)

### Login/Signup page
Anyone can signup for the app. After user signs up, then they can login.

Once user logs in, the application will get a token from the server. This token is used to access the application APIs.

### Lottery page
This is a main page of the application. It shows an active lottery and also past lotteries. User can get a ballot for the active lottery, and also view the winners of the past lotteries.

The part where I display all lotteries is paginated and it can be filtered by the date.

### My Ballots page
Showing all users ballots. The API requests and the view in this page is also paginated.

### Admin and API
These two links are visible only to admin users. Admin page redirects to Django admin where user have full access to tables and Django models. The API link redirects to Django Rest Framework page where all APIs are listed.

To create an admin user, you can use following command.

```
make superuser
```

## Developer tools
There are a few tools installed that should improve a developer experience or at least make the experience the same between developers.

To make sure that the files are formatted in the same style I am using:
- `.editorconfig`
- `.isort.cfg`
- `black` python formatter

I am also using [pre-commit][pcommit] to run couple of checks before any new commits.

To make it easier to run your the most common commands, I added a `Makefile`. The most used commands to start the developer environment are :
- `make run-server`
- `make run-frontend`


## Instalation and running
Before you start the application you need to install:
- [npm][npm]
- [poetry][poetry]

To start the application:
```
# in console one
`make run-server`

# in console two, if you want to have Webpack watch for changes
`make run-frontend`
# in console two, build production frontend
`make build-frontend`
```


[webpack]: https://webpack.js.org/
[drf]: https://www.django-rest-framework.org/
[wloader]: https://django-webpack-loader.readthedocs.io/en/latest/
[dcron]: https://github.com/tivix/django-cron
[rb]: https://react-bootstrap.netlify.app/
[rdate]: https://reactdatepicker.com/
[axios]: https://axios-http.com/docs/intro
[router]: https://reactrouter.com/en/main
[pcommit]: https://pre-commit.com/
[npm]: https://docs.npmjs.com/
[poetry]: https://python-poetry.org/docs/
