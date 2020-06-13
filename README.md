# NodeJSArticleTask
In this authenticated user add new article which can be seen by anyone  
## Article
Add new article and get list

## install
    npm packages


### code struture 
    server.js server file
    app is our application file
    .env where all secret key 
    utils folder where utility function are written like authentication, applogger(for log), response, erro handling, response handling

### server 
    is running on port by default 1339,  bt i am reading from .env file you can also change in .env file

### Two component 
    
#### user
    where user signup api
        /register for register whose is going to new add article 
        /login  only valid user id authenticated

#### Jwt for authentication

#### Article
    voucher/create : Voucher Generation API (Its only authenticated api)(closed api)
    voucher/fetch : Get Vouchers API (open api)
    voucher/redeem : Voucher Redeem API (open api)


### postman Collection 
    link: https://www.getpostman.com/collections/6e7cd137027e32ace9f1


### logger
    Winston and  i have used 

### storage
    user information data stored in memory [userInformation]
    article information is stored in memory [article]

    





