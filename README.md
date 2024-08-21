# Full Stack REST API with MERN, R Backend Integration and Azure Deployment :)

<div align = "center">

![Node LTS](https://img.shields.io/node/v-lts/node-red?logo=nodedotjs&logoSize=auto) ![React 18.3.1](https://img.shields.io/badge/React-18.3.1-blue.svg?logo=react&) ![Express.js](https://img.shields.io/badge/Express.js-404D59.svg?logo=express&) ![Static Badge](https://img.shields.io/badge/MongoDB-darkgreen?logo=mongodb&logoSize=auto)
![Static Badge](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=black) ![Static Badge](https://img.shields.io/badge/Tailwind_CSS-blue?logo=tailwindcss&logoSize=auto) ![Static Badge](https://img.shields.io/badge/ShadCN%2FUI-black?logo=shadcnui&logoSize=auto)
![Static Badge](https://img.shields.io/badge/R_Language-blue?logo=r&logoSize=auto) ![Static Badge](https://img.shields.io/badge/Github_Actions-black?logo=githubactions&logoSize=auto)

</div>

## Introduction
This project provides a comprehensive starting point for building a full-stack application using the **MERN** (MongoDB, Express.js, React, Node.js) stack, featuring complete **CRUD** (Create, Read, Update, Delete) functionality for developing **RESTful APIs**. Additionally, this project demonstrates how to integrate **R**, a popular programming language for statistical computing and graphics, as a backend API.

To further streamline development and deployment, this project also includes a **GitHub Actions workflow** for automating testing, building, and deployment to **Azure**, ensuring a seamless and efficient development experience..  
## Tech Stack
- MongoDB (Azure Cosmos DB for MongoDB)
- Express.js & R (developped backend API)
- React (Vite)
- Node
- TailwindCSS
- TypeScript
- React Hook Form
- Zod (for frontend validation)
- ShadCN UI
- GitHub Actions
## Features
:white_check_mark:  **Complete CRUD Operations:** Perform Create, Read, Update, and Delete operations with ease.
:white_check_mark: **Responsive Design:** Enjoy a seamless user experience across various devices and screen sizes. (This is not to showcase fancy UI)
:white_check_mark: **Dual Backend Connectivity:** Connect to two backends, Express.js and R with `plumber`.
:white_check_mark: **Azure App Services Deployment:** Deploy the MERN stack application on Azure App Services for scalable and secure hosting.

## How To Get Started
#### Setup project locally or VM (Ex: Azure VM): 
01. Install mongodb locally
    - Follow the [documentation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu) to install depending on your machine. 
    - [Download](https://www.mongodb.com/try/download/compass) & install `MongoDB compass GUI` 
    - Connect to your database
        ex: `mongodb://localhost:27017/dairy` 

02. Setup backend in `Node` runtime environment.
    - ```git clone "https://github.com/naratech-eng/milk-yeild.git" ```
    - make sure barnch is "main" `git branch`
    - `cd backend` & create `.env`
    - `npm install`
    - start server `npm run dev`

***setup environment variables***

```env
PORT=5001
MONGODB_URI=
CLIENT_URI=
MONGODB_URI_SECONDARY=
```
uncomment following code to resolve `CORS` erros 
```typescript
app.use(cors({
    origin: process.env.CLIENT_URI,
    optionsSuccessStatus: 200,
  }));
```

Note: Use a postman or similar to test CRUD operations. 
Ex: `localhost:5001/api/milking`

03. Setup frontend code for user interactions:
    - `cd` into `client` folder
    - `npm install`
    - create `.env.development`
    - add `VITE_API_URL='http://127.0.0.1:5001'`or `localhost:your_port`
    - start `npm run dev`
    - browse `http://localhost:5173/` 

Note: Deployed version on Azure app services: 

04. Setup backend in `R` runtime environment for R users: 
    You should have installed `r-base` or `RStudio` and assuming that you have all the pre-requisite;
    - `git checkout r-api`
    - `cd ` into `r-backend`
    - install `install.packages("plumber")`
    - create `.env` file (You can use `renv` or `dotenv`)
    - connect to the same database as above 
    - run `Rscript backend.R`
    - install packages like `install.packages("mongolite")` and other packages if it's not instlled directly with script.

**environment variables**
```env
MONGO_URL=mongodb://localhost:27017
MONGO_DB=dairy
MONGO_COLLECTION=milkingdatas
PORT=5001
```
change these as per your configurations. 

**Test REST API**
You can use a tool like `postman` or inbuilt `Swagger UI` 
ex: `http://127.0.0.1:5001/__docs__/#`

Frontend is the same setup as before and you just have to change environment variables (`VITE_API_URL='server_url:port'`)

#### Deploy on azure & setup CI/CD

## Links
Here are the links that you can find more informations and documentations.
## Contribute to improve 




