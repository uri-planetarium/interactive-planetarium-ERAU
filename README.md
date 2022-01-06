
<h1 align="center">Interactive Planetarium Project ERAU</h1>
<p align="center"><b>A mobile web app designed to add audience interactivity to Embry Riddle Aeronautical University's planetarium shows</b></p>
<br>

<h3 align="center">🔘 How to use 🔘</h3>

![Border](https://github.com/uri-planetarium/interactive-planetarium-ERAU/blob/main/Divider.png)

- This guide assumes Node v16.13.1 and npm v8.1.2

<h2>For Development</h2>

<h4>1. Clone the Github Repo</h4>

  ```
  git clone https://github.com/uri-planetarium/interactive-planetarium-ERAU.git
  ```

<h4>2. Install npm dependencies</h4>

  Be sure to do this in the root directory and the `player_client` folder

  ```
  npm install
  ```  

<h4>3. Setup Postgres</h4> 
  
  Setup Postgres if you haven't already. Here's a [link](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart) that might be helpful for this process

  ```
  sudo apt install postgresql postgresql-contrib
  ```

  Then create the database and tables. These commands can be found in `database.sql` in the root folder
 
<h4>4. Declare your environment variables</h4>

  The `.env` file should be placed in the root directory.
 
  ```
  PG_USER = your_username
  PG_PASSWROD = your_password
  PG_HOST = localhost
  PG_DATABASE = planetarium_uri_db
  PG_PORT = 5432
  ```
  
<h4>5. (Optional) Install nodemon</h4>
  
  This allows you to write code for the server and have it automatically refresh each time

  ```
  npm install -g nodemon
  ```
  
<h4>6. Start the App</h4>
    
  In the root directory...
 
  ```
  npm start
  ```  
  
  The above can be replaced with `nodemon index.js` if you installed that
  
  In the `player_client` folder...
  
  ```
  npm start
  ```
 
  React's default start script automatically updates when you make changes

<h2>For Production</h2>

  <h4>1. Install Heroku</h4>
  
  First install `snap`
  
  ```
  sudo apt install snapd
  ```
  
  Then install and login to Heroku's CLI. [Here's](https://devcenter.heroku.com/articles/heroku-cli) Heroku's initial setup page for reference
  
  ```
  sudo snap install --classic heroku
  
  heroku login
  ```
  
  `heroku login` opens up a login webpage. If working in a virualbox, `heroku login -i` will allow you to sign in through the terminal
  
<h4>2. Git remote the Heroku Github Repository</h4>
  
  ```
  heroku git:remote -a erau-interactive-planetarium
  ```
  
<h4>3. Sync the pushes to both Github Repositories</h4>
  
  Syncing the pushes between this Github repository and the Heroku one allows you to push your code once and update both repositories
  
  ```
  git remote add both https://github.com/uri-planetarium/interactive-planetarium-ERAU.git
  git remote set-url --add --push both https://github.com/uri-planetarium/interactive-planetarium-ERAU.git
  git remote set-url --add --push both https://git.heroku.com/erau-interactive-planetarium.git
  ```
  
  When pushing changes, `git push both` will push committed changes to both repositories

<h3 align="center">🔘 Diagrams 🔘</h3>

![Border](https://github.com/uri-planetarium/interactive-planetarium-ERAU/blob/main/Divider.png)

<h2>Web UI-API Interactions</h2>

<p align="center" >
  <img src="https://github.com/uri-planetarium/interactive-planetarium-ERAU/blob/main/assets/Web-UI-API-interactions.png">
</p>

<h2>Postgres Table Relationships</h2>
<p align="center" >
  <img src="https://github.com/uri-planetarium/interactive-planetarium-ERAU/blob/main/assets/Table-Relationships.png" width="600">
</p>

