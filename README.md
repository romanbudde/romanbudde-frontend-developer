# romanbudde-frontend-developer
[![Video of the plugin]](https://www.veed.io/view/e10295b0-8f75-4a51-8f99-b924699b66e4?panel=share)
Technical Assessment  

The plugin I've developed is called 'rockets-block'.  

First, the objectives of this technical assessment are:  

Build a WordPress plugin that adds a Gutenberg block for a WordPress administrator to display Rockets on their website.  

The block and its data should be available to logged in users only. Non-logged in users should see a login form or a login prompt.  
The block should fetch data using @wordpress/api-fetch through the WordPress REST API.  
Create a WordPress REST API endpoint to fetch & send data in between SpaceX & your block. Only logged in users should be able to access the endpoints.  

The request to the SpaceX API should be done on the WordPress server and returned through the WordPress API endpoint.  
A good-looking, pixel-perfect design for the block grid of capsules will showcase the design skills.  

The block must have 2 features: A search form, and data grid.  
For the search form:  
  - Having three search filters would be excellent. For example: User can search Capsules by status, original_launch, and type (there is no type attribute in rockets, just in capsules)  
  - Deliver a good user experience  
  - Fully functional search form without bugs  
  - Optimized search query to deliver quick results.


For the data grid:  
  - Elegant design  
  - Display the right amount of data  
  - Paginated data grid, shows 2 rockets per page.  
  - When clicking on the item, it displays the item data in the popup.  

  
The design needs to be responsive for all screen sizes and different browsers.  
Use of Semantic HTML & SEO best practices is appreciated.  
Creating test cases for the code is not required, but it will take your assignment to another level.  
The app should not produce any ESLint & PHPCSissues.  

Secondly, here are the steps necessary to set it up and running:  

- clone the repo  
- at the root level run:  
  docker-compose build  
  docker-compose up  
- head over to wordpress admin panel at localhost/wp-admin/  
- go to plugins and activate the rockets-block plugin.  
- cd to the wp-content/plugins/rockets-block folder and run  
  npm install  
  npm start  
- go to any post and add the block called 'Rockets Block'.  
- save/publish the post and open it on the frontend, it should be displaying the paginated grid of rockets (for logged in users only).


The main tech stack used was:  
- gutenberg block (react js)  
- @wordpress/api-fetch to communicate with the WP API from the block.  
- @wordpress/scripts for the build process.  
- tailwind css for styling  
- jest for testing  
