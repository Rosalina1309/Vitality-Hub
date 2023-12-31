namespace :exercises do
  desc 'Scrape and insert exercises by muscle group'
  task scrape: :environment do
    require 'rest-client'
    require 'json'
    require_relative '../../models/Exercise'

    muscle_groups = [
      'abdominals', 'abductors', 'adductors', 'biceps', 'calves', 'chest',
      'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back',
      'neck', 'quadriceps', 'traps', 'triceps'
    ]

    api_key = 'u1MqE9OcSe2ROpt0Tl+7HQ==domWx22TnqrwssW3'

    muscle_groups.each do |muscle|
      puts "#{muscle}"
      url = "https://api.api-ninjas.com/v1/exercises?muscle=#{muscle}"
      begin
        response = RestClient.get(url, headers = { 'X-Api-Key': api_key })

        if response.nil?
          puts "Response is nil. Something went wrong."
          # Handle the error or exit gracefully
        else
          data = JSON.parse(response)
          # Handle the API response data
        end
      rescue RestClient::BadRequest => e
        puts "Full Response: #{response}"
        puts "Bad Request Error: #{e.response}"
        # Handle the error or exit gracefully
      rescue RestClient::Exception => e
        puts "RestClient Error: #{e}"
        # Handle other RestClient errors or log them
      end
      exercises_count = 0

      data.each do |exercise_data|
        # You can customize this part based on your Exercise model's attributes
        name = exercise_data['name']
        type = exercise_data['type']
        muscle_group = muscle
        equipment = exercise_data['equipment']
        difficulty = exercise_data['difficulty']
        instructions = exercise_data['instructions']

        existing_exercise = Exercise.find_by(name: name, type: type, muscle: muscle_group)

        if existing_exercise.nil?
          exercise = Exercise.new(
            name: name,
            type: type,
            muscle: muscle_group,
            equipment: equipment,
            difficulty: difficulty,
            instructions: instructions
          )

          if exercise.valid?
            exercise.save
            exercises_count += 1
            puts "Inserted exercise #{exercises_count}: #{name}"
          else
            puts "Failed to insert exercise #{name}. Errors: #{exercise.errors.full_messages.join(', ')}"
          end
        else
          puts "Exercise #{name} (Type: #{type}, Muscle: #{muscle_group}) already exists. Skipping."
        end
      end

      puts "Scraped and saved #{exercises_count} exercises for muscle group: #{muscle}"
    end

    puts 'Scraping completed.'
  end
end
