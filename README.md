# Investment Fund Management System - Frontend

The motivation to build this system comes from the limitations of traditional methods, which
heavily rely on manual processes/work, spreadsheets to track investments, and paper
records, which lead to inefficiencies, a higher risk of errors, and are also time-consuming. As
investment portfolios become more complex and global, involving investment types like
mutual funds, hedge funds, bonds, and so forth, building an investment fund management
system offers a more efficient and accurate way to manage financial assets and improve
decision-making. User can leverage this system to create, update and delete their investment
data which can help them better manage their investment strategy. This reduces a lot of time
for them as they have a centralized source of data to refer if they ever need to go back and
trace their history to make a better decision either now or in future.

## Authors

- [@SujaySN](https://github.com/soul-reaper46)
- [@Deepansh Chaturvedi](https://github.com/DeepanshChaturvedi)
- [@Neha Ganeshe](https://github.com/SachinShet73)
- [@Anagha](https://github.com/anaghagodbole)
- [@Sanskruti Mahajan](https://github.com/Msanskruti)

## Documentation

[Initial Project File,](https://github.com/neha-ganeshe4/DMDD_Project/blob/main/DMDD%20Project%20Topic%20and%20Objectives.pdf)
[Design Document,](https://github.com/neha-ganeshe4/DMDD_Project/blob/main/DMDD%20P2.pdf)
[Logical ERD](https://github.com/neha-ganeshe4/DMDD_Project/blob/main/P3.pdf)

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Project Structure

Below is the basic file structure of the project

```bash
Project Root/
├── .vscode/
├── node_modules/
├── public/
│   ├── images/
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon.ico
│   │   ├── logo192.png
│   │   └── logo512.png
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── site.webmanifest
│
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   └── Button.js
│   │   ├── Navbar/
│   │   │   └── Navbar.js
│   │   ├── ResponsiveDrawer/
│   │   │   └── ResponsiveDrawer.js
│   │   └── StyledLink/
│   │       └── StyledLink.js
│   │
│   ├── hooks/
│   │   └── useAuth.js
│   │
│   ├── pages/
│   │   ├── Analytics/
│   │   │   └── Analytics.js
│   │   ├── Asset/
│   │   ├── Dashboard/
│   │   │   └── Dashboard.js
│   │   ├── Home/
│   │   │   └── Home.js
│   │   ├── Invest/
│   │   │   └── invest.js
│   │   ├── Login/
│   │   │   ├── Login.js
│   │   │   └── SignUp.js
│   │   ├── Portfolio/
│   │   │   └── Portfolio.js
│   │   ├── Profile/
│   │   │   └── Profile.js
│   │   └── WatchList/
│   │       └── WatchList.js
│   │
│   ├── services/
│   │   ├── edituserapicall.js
│   │   ├── getuserapicall.js
│   │   ├── loginapicall.js
│   │   └── signupapicall.js
│   │
│   ├── theme/
│   │   └── theme.js
│   │
│   ├── utils/
│   ├── App.js
│   ├── index.js
│   └── logo.svg
│
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Tech Stack

**Application:** React, Material UI

## Run Locally

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Create Main Folder "IFMS_Project"

Clone the project

```bash
  git clone https://github.com/soul-reaper46/IFMS_frontend.git
```

Go to the project directory

```bash
  cd IFMS_frontend
```

Install dependencies (Ensure Node.js is installed in System)

```bash
  npm install
```

Start the server

```bash
  npm start
```

To View:

- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

- Make Sure Backend is running first. If you have not initialized backend please head over to [Backend](https://github.com/soul-reaper46/IFMS_backend).

## Usage/Example

```
After Starting the Development Server

* Use the following details to login:
    User: john.smith@email.com
    Password: password123

* Else just SignUp as a new user!
```
