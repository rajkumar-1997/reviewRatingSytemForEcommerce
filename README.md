#Review and rating system for ecommerce website

1.Installing in local use git clone command

2.Use npm i command for resolvoing all dependencies

3.Use your own .env keys

4.Start application by npm run start command in local

5.Aws s3 is used for storing images on cloud and mongoDb data base is used

6.Followed object oriented low level design pattern along with MVC architecture

7.There are different routes like user routes for login,signup and product routes for adding prodcut by seller and seeing all listed prodcut by both seller and users and review routes for review related actions

8.There is no sample data of prodcut i am attaching here because you can access all product list by
/product/getAllProducts endpoint for review related actions. but for this you have to do signup and login and use jwttoken for authorization for access all api endpoints

9.Deployment process:- first of all created aws ec2 linux server instance and generated key for access server from putty. then login on server by putty with private key as ec2-user. updated list of all vailable package on linux server. after this installed node js on linux server. after this installed mongodb on server. after this installed git on server. after this took clone of git repoon server. then installed all dependecies in project directory by command npm i. then started server by npm run start command. After this in ec2 instance security group added my application port for access server.
