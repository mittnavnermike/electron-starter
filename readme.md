# Electron with react-create-app starter

1. Run `create-react-app` in `./`
2. Replace `src-original` with `src` folder which `create-react-app` creates
3. Run `npm install -S electron` and `npm install -D npm-run-all node-sass-chokidar foreman menubar`
4. Add scripts to `package.json`
```"homepage": "./",
  "main": "electron-starter.js",
  "scripts": {
    "dev": "nf start",
    "start-js": "react-scripts start",
    "start": "BROWSER=none npm-run-all -p watch-css start-js",
    "electron": "electron .",
    "electron-dev": "ELECTRON_START_URL=http://localhost:3000 electron .",
    "electron-build": "rm -rf bookmarks-darwin-x64 && electron-packager . bookmarks && cp bookmarks.icns ./bookmarks-darwin-x64/bookmarks.app/Contents/Resources/electron.icns",
    "build": "npm run build-css && react-scripts build",
    "build-css": "node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/",
    "watch-css": "npm run build-css && node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/ --watch --recursive",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
  ```
5. `npm run dev` or `yarn dev` :tada: