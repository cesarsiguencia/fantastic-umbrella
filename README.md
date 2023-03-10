# E-commerce Back End App 'Fantastic Umbrella'
- - - - - - - - - - 
NOTE FROM DEVELOPER:
1. THIS APP IS STILL IN DEVELOPMENT, BUT THE BACK END IS COMPLETE AND USEABLE
2. FUTURE PLANS FOR THIS APP INCLUDE THE FOLLOWING:
    - INCLUDE A FRONT END
    - INTEGRATE TO A CLOUD FOR ONLINE PRODUCTION, SUCH AS HEROKU

- - - - - - - - - - 

This a sample back end project for an e-commerce business that runs successful CRUD requests for various categories, products, and tags. Users are able to view the products, their prices, stock inventory, and associated tags using MySQL. Routes are run using Express and Sequelize.

This application can only be run locally. Follow instructions below on how to run.


### Technologies Used
1) Express
2) Sequelize
3) MySQL
4) Dotenv

### Tables/Models

1. Category
2. Product
3. ProductTags (Links a Product to a Tag, a Product can have many ProductTag)
4. Tag


### List of Built APIs in this application

- GET (GET ALL categories, GET ONE category, GET ALL products, GET ONE product, GET ALL tags, GET ONE tag)
- POST (CREATE ONE category, CREATE ONE product, CREATE ONE tag)
- PUT (UPDATE category name, UPDATE product details, UPDATE tag name, CREATE (ProductTag through a PUT product route))
- DELETE (DELETE ONE category, DELETE ONE product (also deletes associated ProductTag), DELETE ONE tag (also deletes associated ProductTag))


### Website Link
COMING SOON WHEN FRONT END IS COMPLETE.

### Installation

1. Git clone or download the application and load on VSCode
2. Run 'npm install' in the Command Line, make sure MySQL and Express are installed
    - If this is your first time installing MySQL, please navigate to their documentation for proper installation into your computer and credential creation
3. Change your package.json scripts to your chosing, preferred to include "start" : "node server.js" as one of your scripts
4. Navigate to .env and include your MySQL user and password in the fields commented.
5. Load the MySQL shell and run the command 'SOURCE db/schema.sql' to create the new database. 
6. Quit the MySQL shell and run 'npm run seed' in the Command Line to load the starter data to the database.
7. Run 'npm start' to start the server. If port 3100 is in use, kill it or use another port



### Walkthrough Video
[PART 1](https://drive.google.com/file/d/1K3v39phzW8sRR60-hnT2YjiEWcdYap57/view)

[PART 2](https://drive.google.com/file/d/14L-_tXcQPB23n_ht7gkvdYLYXvMXOF7y/view)




