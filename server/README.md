# README

This is the back end of Vitality Hub.

- Ruby version

  3.2.2

- Rails version

  7.1

- Configuration

  Remember to run bundle install on start

- Database creation

  Make sure to create a .env file with the necessary db, user, etc. and then run 'rails db:create'.

- Database initialization

  rails db:migrate

- Get data for recipes and exercises tables

  - Go to app/models/exercise.rb
  - Comment out the id
  - Run 'rake scrape_exercises scrape_recipes' on terminal
  - Uncomment the id on exercise.rb

- How to run the test suite

  - Make sure you have a test configuration in your database.yml
  - Run bin/rails db:migrate RAILS_ENV=test
  - bundle exec rspec
  - If you want to see the tests formatted run bundle exec rspec --format documentation
  - If you only want to run the tests of a specific file run bundle exec rspec "spec/models/user_spec.rb" //Specific route to the test you want to run

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...
