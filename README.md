
<div align = "center">

# Full Stack REST API with MERN, R Backend Integration and Azure Deployment :smiley:

![Node LTS](https://img.shields.io/node/v-lts/node-red?logo=nodedotjs&logoSize=auto) ![React 18.3.1](https://img.shields.io/badge/React-18.3.1-blue.svg?logo=react&) ![Express.js](https://img.shields.io/badge/Express.js-404D59.svg?logo=express&) ![Static Badge](https://img.shields.io/badge/MongoDB-darkgreen?logo=mongodb&logoSize=auto) <br/>
![Static Badge](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=black) ![Static Badge](https://img.shields.io/badge/Tailwind_CSS-blue?logo=tailwindcss&logoSize=auto) ![Static Badge](https://img.shields.io/badge/ShadCN%2FUI-black?logo=shadcnui&logoSize=auto) <br/>
![Static Badge](https://img.shields.io/badge/R_Language-blue?logo=r&logoSize=auto) ![Static Badge](https://img.shields.io/badge/Github_Actions-black?logo=githubactions&logoSize=auto)

</div>

## Introduction
This project provides a comprehensive starting point for building a full-stack application using the **MERN** (MongoDB, Express.js, React, Node.js) stack, featuring complete **CRUD** (Create, Read, Update, Delete) functionality for developing **RESTful APIs**. Additionally, this project demonstrates how to integrate **R**, a popular programming language for statistical computing and graphics, as a backend API.

To further streamline development and deployment, this project also includes a **GitHub Actions workflow** for automating testing, building, and deployment to **Azure**, ensuring a seamless and efficient development experience.

Dataset Source: I used [Borealis Milk Yield Data](https://borealisdata.ca/dataset.xhtml?persistentId=doi:10.5683/SP3/PZJB4L) (file: 4511.csv) to test the app. This dataset allows users to add, delete, or update records as needed.

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
I have created 3 branches for easy deployment
    `backend` - backend code (express)
    `client` - frontend code (Vite: React)
    `r-api` - R backend web API using `plumber` [documentation](https://www.rplumber.io/articles/routing-and-input.html#dynamic-routes)  
### Setup project locally or VM (Ex: Azure VM): 
01. Install MongoDB locally
    - Follow the [documentation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu) to install depending on your machine. 
    - [Download](https://www.mongodb.com/try/download/compass) & install `MongoDB compass GUI` 
    - Connect to your database
        ex: `mongodb://localhost:27017/dairy` 

02. Setup backend in `Node` runtime environment.
    - ```git clone "https://github.com/naratech-eng/milk-yeild.git" ```
    - make sure branch is "backend" `git checkout backend`
    - `cd backend` & create `.env`
    - `npm install`
    - start server `npm run dev`

***Setup environment variables***

```env
PORT=5001
MONGODB_URI=
CLIENT_URI=
MONGODB_URI_SECONDARY=
```
uncomment following code to resolve `CORS` errors 
```typescript
app.use(cors({
    origin: process.env.CLIENT_URI,
    optionsSuccessStatus: 200,
  }));
```

Note: Use a postman or similar to test CRUD operations. 
Ex: `localhost:5001/api/milking`

03. Setup frontend code for user interactions:
    - `cd` into the `client` folder
    - `npm install`
    - create `.env.development`
    - add `VITE_API_URL='http://127.0.0.1:5001'`or `localhost:your_port`
    - start `npm run dev`
    - browse `http://localhost:5173/` 

Note: Deployed version on Azure app services: https://mango-ground-0ef454c0f.5.azurestaticapps.net/

04. Setup backend in `R` runtime environment for R users: 
    You should have installed `r-base` or `RStudio` and assuming that you have all the pre-requisite;
    - `git checkout r-api`
    - `cd ` into `r-backend`
    - install `install.packages("plumber")`
    - create `.env` file (You can use `renv` or `dotenv`)
    - connect to the same database as above 
    - run `Rscript backend.R`
    - install packages like `install.packages("mongolite")` and other packages if it's not installed directly with script.

**environment variables**
```env
MONGO_URL="mongodb://localhost:27017"
MONGO_DB="dairy"
MONGO_COLLECTION="milkingdatas"
PORT="5001"
```
change these as per your configurations. 

**Test REST API**

You can use a tool like `postman` or inbuilt `Swagger UI` 
ex: `http://127.0.0.1:5001/__docs__/#` 

Frontend is the same setup as before and you just have to change environment variables (`VITE_API_URL='server_url:port'`)

### Deploy on azure & setup CD 
If you're having trouble deploying with GitHub workflows, try removing them, forking the repository, and following the instructions.
01. Azure Cosmos DB for MongoDB setup
You can use `Azure Data Studio` or `Azure VS code` extensions or `Azure Web Portal`
    - Log in to my azure and create a resource using free tier
    - Search for `Azure Cosmos DB` and create `Azure Cosmos DB for MongoDB`
    - Choose `Request unit (RU) database account` free option

02. Deploy the Backend (Node.js/Express) to **Azure App Service**
You can use `github actions workflow` or `Azure Portal`          
    - Create an **App Service** using `create web app` with Node.js as a runtime stack
    - Go to resources and `deployment center` then connect `github` account
    - Select repository `milk-yeild` and branch as `backend`  
    - Build provider should be `github actions`
    - Goto settings -> Environment variables -> add `MONGODB_URI` & `MONGODB_URI_SECONDARY` and get the connection string from `Azure Cosmos DB` (settings -> connection strings)
    - make sure `git pull origin backend` and check & edit **branch & working directory** on `.github/workflows/backend_milking-yield.yml` 

    ```
    on:
      push:
        branches:
          - backend
      workflow_dispatch:
    ```
    ![Screenshot working directory](https://i.imgur.com/V9AUAf6.png)
    ```
    with:
        app-name: YourAppServiceName
        slot-name: 'Production'
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: .
    ```
**Important:** Make sure to edit and/or add the connection string to the DB
``` :10255/<YOUR_DB_NAME>?ssl=true ``` otherwise, you won't be able to connect with specific collections. 

Note: Test your backend with postman or similar tool before you deploy client

03. Deploy the Frontend (Vite/React) to Azure Static Web Apps

    - Search for `Static Web Apps` 
    - When you create;
        - Source: Choose GitHub
        - GitHub Repository: `milk-yield`
        - Branch: `client`
        - Build Presets: custom 
        - App location: `client`
        - Output location: `dist`
    - Add backend url under the environment variables ```VITE_API_URL```
    - Make sure to add client url under the variables (step 02 - app services)
    - Enable and add client url for `CORS` (step 02 - app services)

Click here to test [Live DEMO](https://mango-ground-0ef454c0f.5.azurestaticapps.net)

```githubactions
with:
    azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
    repo_token: ${{ secrets.GITHUB_TOKEN }}
    action: "upload"
    app_location: "./client"
    output_location: "dist"
```
## Summary
With the backend and frontend fully integrated into a CI/CD pipeline, every change you make will be seamlessly deployed, allowing you to focus on enhancing your application. This setup not only streamlines your workflow but also gives you the freedom to explore new features, improve existing ones, and scale your app as needed.

This is just the beginning—keep pushing the boundaries of your project and enjoy the process of building something great. Happy coding! 🚀


## Links
Here are the links that you can find more informations and documentations.
- Vite App(React): https://vitejs.dev/guide/
- ShadCN: https://ui.shadcn.com/docs
- Tailwind CSS: https://tailwindcss.com/docs/installation 
- Zod: https://zod.dev/
- Azure [create web app](https://learn.microsoft.com/en-us/azure/app-service/quickstart-nodejs?tabs=linux&pivots=development-environment-azure-portal)
- Azure cosmos db [connection string edit](https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/connect-account)


## Contribute to improve 
If you have ideas for improvements or need to report an issue, I welcome your contributions! Simply pull the latest changes from the repository, and feel free to submit your suggestions or fixes through a pull request. Your input helps make this project better for everyone. Thank you for contributing!



