# SEM-IR-App

## Prerequisites

- [Node.js v16](http://nodejs.org) -  `brew install node@16`
- [MongdbDB](https://docs.mongodb.com/manual/administration/install-community/)

## How to run

1. Go to the project root, set node version to 16 using `nvm use 16`. 
2. Run `npm install --legacy-peer-deps` to install all dependencies for both the client and server. (<img src="https://img.freepik.com/free-icon/warning_318-502947.jpg" height=25 width=25 > legacy peer deps flag is necessary to install packages like materialUI which does not support the latest react version)
3. Run `npm run dev` to start a dev server, an express server will be up and running on `localhost:3001` and a new tab will open in your browser displaying the client webpage on `localhost:3000`.
4. Happy Coding! All your saved changes will be reflected immediately without manually restarting the server or website.

You may also try running the client and server separately using below commands :

1. Run `npm start` in the `client` directory.
2. Run `npm run dev` in the `server` directory simultaneously in a different terminal.
3. Edit source code in the two folders respectively.

## How to debug the server

Once the server is running, you can go to [`chrome://inspect`](chrome://inspect) in Chrome to `inspect` a `Remote Target` named `build/index.js`.

## How to write Storybook stories

Please refer to [here](client/src/stories/README.md)

## <img src="https://cdn-icons-png.flaticon.com/512/4752/4752521.png" height=25 width=25> 2023 Technology Upgrade

1.  Updated `node` version to 16.
2.  Upgraded `react` to latest version - 18.2.0.
3.  Upgraded `typescript` and other npm modules to support `node 16`.
4.  Migrated class components to functional components.
5.  Improved unit tests performance.
6.  Removed the role `doctor`
7.  Removed `eslint`from both client and server package. 
9.  Remove `husky` and `prettier`.


## <img src="assets/cool-doge.gif" height=25 width=25> 2022 Technology Upgrade

1. Removed `tslint`, `tslint-config-prettier`, and `tslint-plugin-prettier`
2. Removed `tslint.json`
3. Removed `typescript` from root package
4. Updated `husky` for pre-commit hooks and pre-push hooks
5. Added `typescript` to `client/`
6. Added `eslint` to `server/`
7. Added `eslint` to `client/`
8. Added prettier config files to `client/` and `server/`

   8.1. If you are using VSCode, you'll need to enable it in VSCode at `setting.json`

   ```
   "editor.defaultFormatter": "esbenp.prettier-vscode"
   ```

9. Examples of functional components

```
/client/src/components/ContactList.tsx
/client/src/components/Message.tsx
/client/src/components/TabBar.tsx
```

10. Upgraded Storybook version from `5.x` to `6.x` and updated syntax of stories.

## Attribution

Codebase owned by Andy Su, Pallav Soni, Gongpu Zhu @ CMU



