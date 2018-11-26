# shopping-list

## Installation

- Install Dependencies : `npm i -D`
- Before packing, be sure to set `NODE_ENV` to `production` :

  **Linux :**

  ```bash
  $ export NODE_ENV=production
  ```

  **Windows :**

  ```cmd
  SET NODE_ENV=production
  ```

  or put this line in `main.js` :

  ```javascript
  process.env.NODE_ENV = "production";
  ```

- To pack, use any of the following :

  **Linux :**

  ```bash
  $ npm run package-linux
  ```

  **Windows :**

  ```cmd
  npm run package-win
  ```

  **Mac :**

  ```bash
  npm run package-mac
  ```

### References :

- http://www.iconarchive.com/show/real-vista-business-icons-by-iconshock/shopping-cart-icon.html (:art:)
- https://www.christianengvall.se/electron-packager-tutorial/ (:package:)
