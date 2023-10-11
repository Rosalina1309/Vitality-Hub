namespace :recipes do
  desc 'Scrape and insert recipes'
  task scrape: :environment do
    require 'pg'
    require 'rest-client'
    require 'json'
    require_relative '../../models/Recipe'

    page = 1
    recipes_count = 0

    while true
      url = "https://api.spoonacular.com/recipes/findByNutrients?apiKey=48162264bce24f528c7ff4e640ca08cd&minCarbs=10&maxCarbs=50&number=100&page=#{page}"
      response = RestClient.get(url)
      data = JSON.parse(response)

      break if data.empty?

      data.each do |recipe|
        id = recipe['id']
        title = recipe['title']
        image = recipe['image']
        calories = recipe['calories']
        protein = recipe['protein']
        fat = recipe['fat']
        carbs = recipe['carbs']

        existing_recipe = Recipe.find_by(id: id)

        if existing_recipe.nil?
          recipe = Recipe.new(
            id: id,
            title: title,
            image: image,
            calories: calories,
            protein: protein,
            fat: fat,
            carbs: carbs
          )

          if recipe.attributes.values.any?(&:nil?)
            puts "Recipe is missing required attributes. Skipping."
            break
          end

          if recipe.save
            recipes_count += 1
            puts "Inserted recipe #{recipes_count}: #{title}"
          else
            puts "Failed to insert recipe #{title}. Errors: #{recipe.errors.full_messages.join(', ')}"
          end
        else
          puts "Recipe #{title} (ID: #{id}) already exists. Skipping."
        end
      end

      page += 1
    end

    puts 'Scraping completed.'
  end
end
