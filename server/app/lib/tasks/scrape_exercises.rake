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

    api_key = ENV['EXERCISES_API_KEY']

    muscle_groups.each do |muscle|
      puts "#{muscle}"
      url = "https://api.api-ninjas.com/v1/exercises?muscle=#{muscle}"
      begin
        response = RestClient.get(url, headers = { 'X-Api-Key': api_key })

        if response.nil?
          puts "Response is nil. Something went wrong."
        else
          data = JSON.parse(response)
        end
      rescue RestClient::BadRequest => e
        puts "Full Response: #{response}"
        puts "Bad Request Error: #{e.response}"
      rescue RestClient::Exception => e
        puts "RestClient Error: #{e}"
      end
      exercises_count = 0

      data.each do |exercise_data|
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
