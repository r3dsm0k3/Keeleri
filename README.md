# Keeleri
Create an 'almost' production ready web application/api server. (Boilerplate+goodies)

Keeleri uses Express as the web application framework, MongoDB as the database (and mongoose client) and redis for session storage.

Getting Started.  
-------------
 - Clone the repo.
 - Change the volume directive in the docker-compose file to your directory.  (*todo* Take from ENV)
 > **Note:**
 This is the directory if you want mongodb as persistant store. Docker containers are stateless, everytime you reboot, it deletes everything in the container. To solve this, you will have a create a directory in your own computer and attach to the mongo container. This way, every time the container boots up, it will mount the directory and its contents from your computer to `/data/db` directory of the mongo container.
 
 - Finally run `docker-compose up -d`
   
  > **Note:**
  This is going to take a while since it has to download the root fs, build the images and run it. Hopefully by the end of it, you should have a working hackathon starter ready. 

If everything is successfull you should have your node server running on 7337 and 80 would be used by nginx as the reverse proxy for node server. Happy hacking!

Basic structure of the application
--------------
 - Adding a route and its handler
    - create your new controller page in the /app/controllers
    - add the corresponding route in /app/routes 
    - add the view as ejs file in the /app/views folder
    > Check the examples in the corresponding folder.
