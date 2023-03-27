# ADNEGS_EVTOL
This is a platform for evtol management built with Express JS and MongoDB.
evtol is an electrical vertical takeoff an landing vehicle used as a means of transporting medications to areas with difficult access.

# Project Features
* Employees can signup and login to their account
* Authenticated employees can can login and use the available evtols to send medications to different locations
* Admin can register evtol ( 20 evtols have already been added), edit or delete any evtol if neccessary.
* Admin login details `Username: adnegsevtol, Password: 12345`

# .env
.env file contains :
* MONGODB URL and PASSWORD for connection to database
* TOKEN_KEY and TOKEN_EXPIRES for user authentication using jsonwebtoken
* CLOUDINARY CLOUD_NAME, API_KEY and API_SECRET for uploading images to cloud using Cloudinary

# Endpoints
Endpoints used in the application are:

* ## POST
  * api/v1/users/register = Create a new account
  * api/v1/users/login = Login to your account
  * api/v1/users/adminlogin = Login to Admin account
  * api/v1/evtol/register = Register a new evtol
  * api/v1/evtol/:serialno = Find evtol by serial number
  * api/v1/medications/addmedication = Add medication to evtol
  
* ## GET
  * api/v1/users/specificUser = Get details of logged in user
  * api/v1/evtol = Get all evtols
  * api/v1/evtol/available = Filter evtols available for booking
  * api/v1/evtol/evtolinuse = Get user who booked the evtol
  * api/vi/medications/:id = Get medications in evtol
  
* ## PUT
  * api/v1/users/update = Update user details
  * api/v1/users/updatepassword = Update user password
  * api/v1/users/adminpassword/:username = Update admin password
  * api/v1/evtol/edit/:id = Edit evtol details
  * api/vi/medications/editmedication/:id = Get medications in evtol
  
* ## DELETE
  * api/v1/evtol/delete/:serialno = Delete evtol by serial number
  * api/vi/medications/editmedication//delete/:id = Delete medications in evtol
