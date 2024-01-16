# HotSpotBnB


## Introduction

HotSpotBnB is a platform that allows you to explore vacation rental properties and create your own listings. Discover hotspots across the United States where you can book unique vacation rentals.

### Getting Started

1. **Explore HotspotBnb:**
   - Visit [HotSpotBnB](https://hotspot-bnb-0pvs.onrender.com) to explore our comprehensive list of vacation rentals.

2. **Create an Account:**
   - Sign up on HotSpotBnB to post a vacation property.



<details open>
  <summary>Features</summary>
  
   
   [MVP Feature List](https://github.com/TheZayWay/HotSpotBnB/wiki/Feature-List)
</details>

## Development
<details open>
  <summary>Running HotSpotBnB</summary>
  
   ### How to set up repo to run project locally
1) Clone [HotspotBnB's repo](https://github.com/thezayway/HotSpotBnB)
2) At the root directory, run npm install
3) Go into the backend directory and create a .env file with these added values
- PORT=8000
- DB_FILE=db/dev.db
- JWT_SECRET=«generate_strong_secret_here»
- JWT_EXPIRES_IN=604800
- SCHEMA=«custom_schema_name_here»
4) In backend, run these two commands to get the database set up
- npx dotenv sequelize-cli db:migrate
- npx dotenv sequelize-cli db:seed:all
5) Run npm start in both the backend directory and the frontend directory
6) Now you are ready to run ChillinBnb locally

## Log In
- Log in or click on Demo User to roam around the website and test the different features


## Create a Spot
- Once logged in, you are able to create a new spot that will redirect you to the spot's page and show up on the home page


## Create a Review
- Users may also leave a review for other user's spot


</details>
