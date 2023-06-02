
# MERN Stack App - Setup Instructions

Rect Application Name: aChat
____
This React Application is basically a chat application using mongodb as a database to store all the chat messages, registered user details including encrypted password.

How to setup the aChat Application:
The application is spitted into two folders

1. api - Backend
2. client - frontend

The client folder can be straightaway deployed on the server without configuring anything.
However to use the backend api we need to run a build command that can be used for deployment to the server.

Inside api folder we to run "npm run build" command to generate the build folder.
All the conntent inside the build folder needs to be transferred on the backend server.

Also need to add environment variables on the node.js hosting server:

1. CLIENT_URL
2. JWT_SECRET (secret key to gernerate encrypted user password)
3. MONGO_URL (Database password to access mongodb)

NOTE: the app only runs on secure connction https only.





## Run Locally

Install aChat application with npm

```bash
  1. inside api folder run npm i
  2. start the backend server "nodemon index.js"
  2. inside client folder run npm i
  4. start the frontend using "yarn dev"
  Once both the frontend and backend server is running the app will be fully fuctionable.

  
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CLIENT_URL`

`JWT_SECRET`

`MONGO_URL`


## 🚀 aChat Github Repository


- [aChat_Github_repo](https://github.com/auqib/projects/tree/main/aChat)


## Authors

- [@Auqib Nazir](https://www.auqib.com)

