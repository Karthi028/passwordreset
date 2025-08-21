Postman Documentation Link:'https://documenter.getpostman.com/view/46153887/2sB3BLhmXD'

we have used the MVC pattern ...where the controllers control the action need to performed on the different routes and the router holds the routes...the models hold the database model of the user...

utils holds the logger and error middlewares along with the configuration for .env 

In order to connect to the front end we have used cors thirdparty librery..

we have also use nodemailer to send mails to the respect user mails...

there are two routes one for forget password where the user enters their mail iD 
other one where the user enters the new Password..

controller in the forget password route the actions that are performed are 
check whether the user exists for the current mailid
if so an random string is being generated and the stored in the database of the respective users object along the expiretime for that string..

next is to create a transporter to send mail...and the mailoptions to be genearted atlast to send the Mail

now the user will be having the reset password link in thier mail once the user click it he will be redirected to a password rest page where he could enter the new passord and then make a api call to the backend along with new password in the body..and also the generated string in the url

in the resetPassword controller using the randon string in the url will comppare it with the one available in the DB if matches the password is hashed using bcrypt and then stored to the database ...and the random string and expire time gets deleted from the db...



