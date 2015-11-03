#Rutgers Rock Paper Scissors


### Getting Started

------------------------
Clone the repo using the GUI or terminal. To do so in terminal, use the following:
```shell
git clone https://github.com/dannyvassallo/rockpaperscissors.git
cd rockpaperscissors
```

From the "rockpaperscissors" directory, install the gems by running the following:
```shell
bundle install
```

To fire up the server while in the "rockpaperscissors" directory use this command:
```shell
middleman s
```

If you are having issues with livereload not working fire up the server using:
```shell
middleman s --force-polling --verbose
```

To kill the server use "ctrl+c"

If you find yourself curious as to what directory you are in use the following in terminal:
```shell
pwd
```
It should turn up "rockpaperscissors"

### Deploying

Create a new app on heroku using heroku-cli. Pass in the following:
```shell
heroku create YOUR-APP-NAME
```

To add an existing repository:
```shell
heroku git:remote -a YOUR-APP-NAME
```

To deploy, commit all changes and pass in:
```shell
git push heroku master
```

To deploy a non-master branch use:
```shell
git push heroku MY-NEW-BRANCH:master
```