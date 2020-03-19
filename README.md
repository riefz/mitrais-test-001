1. API/SERVER/BACKEND
  go to folder
  on terminal :
  run npm install
  npm run start 
  (Assume that when running URL of the server is : http://localhost:3000 )

2. WEB/FRONT END
  go to folder
  on terminal :
  run npm install
  ng serve or ng server --open 
  See in the browser

4. Configure Database :
  run mysql server
  import test-interview-mitrais.sql file

  go to api folder
  open ormconfig.json file
  configure the database name, user and password there

5. configure API URL on WEB/Front End
  go to WEB/Front End folder
  open 'src/app/register/register.component.ts'
  replace 'http://localhost:3000' with your current backend/Server URL

DONE

