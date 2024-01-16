# HotSpotBnB


## Introduction

HotSpotBnB is a platform that allows you to explore vacation rental properties and create your own listings. Discover hotspots across the United States where you can book unique vacation rentals.

### Getting Started

1. **Explore TeeBay:**
   - Visit https://hotspot-bnb-0pvs.onrender.com to explore our comprehensive list of vacation rentals.

2. **Create an Account:**
   - Sign up on HotSpotBnB to post a vacation property.



<details open>
  <summary>Features</summary>
  
   
   [MVP Feature List](https://github.com/TheZayWay/TeeBay2/wiki/MVP-Feature-List)
</details>

## Development
<details open>
  <summary>Running TeeBay</summary>
  
   1. **Clone this repository (only this branch):**

      ```bash
      git clone -b branch_name https://github.com/TheZayWay/HotSpotBnB.git
      ```

  2. **Create a `.env` file:**

      Create a **.env** file based on the example with proper settings for your development environment. Make sure the SQLite3 database connection URL is in the **.env** file.

  4. **Configure the Database Schema:**

      This starter organizes all tables inside the `flask_schema` schema, defined by the `SCHEMA` environment variable. Replace the value for `SCHEMA` with a unique name, **making sure you use the snake_case convention**.

  5. **Migrate and Seed the Database, Run the Flask App:**

      ```bash
      # Activate virtual environment
      pipenv shell

      # Migrate your database
      flask db upgrade

      # Seed your database
      flask seed all

      # Run your Flask app
      flask run
      ```

</details>
