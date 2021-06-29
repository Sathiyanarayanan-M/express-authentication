# Node Authentication using JWT

### Installation

1. Clone the repository
   ```sh
    $ git clone https://github.com/Sathiyanarayanan-M/node-authentication.git
   ```
2. Install NPM packages
   ```sh
   $ npm install
   ```
3. Create a `.env` file and enter following
   ```env
    MONGODB_URI = Your mongodb connection url
    PORT = Port number
    SECRET_KEY = access token secret key 
    EXPIRES_IN = access token expiration time
    REFRESH_SECRET_KEY = Refresh token secret key
    REFRESH_LIFE = refresh token expiration time 
   ```
4. Run the `app.js` file
   ```sh
   $ node app
   ```