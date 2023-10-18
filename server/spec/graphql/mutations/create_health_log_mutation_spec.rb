require_relative '../../rails_helper'
require './app/lib/helpers/jwt_helper'

RSpec.describe 'Mutations::CreateHealthLogMutation', type: :request do
  it 'adds a recipe to the health log' do
    user = FactoryBot.build(:user)
    recipe = FactoryBot.build(:recipe)
    valid_jwt_token = JwtHelper.generate_token(user)

    allow(User).to receive(:find_by).and_return(user)
    allow(Recipe).to receive(:find).and_return(recipe)


    graphql_query = <<~GRAPHQL
      mutation CreateHealthLog($input: CreateHealthLogMutationInput!) {
        createHealthLog(input: $input) {
          healthLog {
            loggable {
              ... on Recipe {
                id
                title
                image
                calories
                protein
                fat
                carbs
              }
            }
          }
          errors
        }
      }
    GRAPHQL

    input_data = {
      input: {
        loggableType: 'Recipe',
        loggableId: 149241
      }
    }
    headers = { 'Authorization' => "Bearer #{valid_jwt_token}" }

    post '/graphql', params: { query: graphql_query, variables: input_data }, headers: headers

    expect(response.status).to eq(200)
    result = JSON.parse(response.body)

    expected_recipe = {
      'id' => '149241',
      'title' => 'Stevia-Sweetened Currant Banana Bread',
      'image' => 'https://spoonacular.com/recipeImages/149241-312x231.jpg',
      'calories' => 186.0,
      'protein' => '5',
      'fat' => '8',
      'carbs' => '22'
    }

    expect(result['data']['createHealthLog']['healthLog']['loggable']).to include(expected_recipe)
    expect(result['data']['createHealthLog']['errors']).to eq([])
  end

  it 'adds an exercise to the health log' do

    user = FactoryBot.build(:user)
    exercise = FactoryBot.build(:exercise)
    valid_jwt_token = JwtHelper.generate_token(user)

    allow(User).to receive(:find_by).and_return(user)
    allow(Exercise).to receive(:find).and_return(exercise)

    graphql_query = <<~GRAPHQL
      mutation ($input: CreateHealthLogMutationInput!) {
        createHealthLog(input: $input) {
          healthLog {
            loggable {
              ... on Exercise {
                id
                name
                type
                muscle
                equipment
                difficulty
                instructions
              }
            }
          }
          errors
        }
      }
    GRAPHQL

    input_data = {
      input: {
        loggableType: 'Exercise',
        loggableId: '18'
      }
    }
    headers = { 'Authorization' => "Bearer #{valid_jwt_token}" }

    post '/graphql', params: { query: graphql_query, variables: input_data }, headers: headers

    expect(response.status).to eq(200)
    result = JSON.parse(response.body)

    expected_exercise = {
      'id' => '18',
      'name' => 'Monster Walk',
      'type' => 'strength',
      'muscle' => 'abductors',
      'equipment' => 'body_only',
      'difficulty' => 'intermediate',
      'instructions' => 'Place a band around both ankles and another around both knees. There should be enough tension that they are tight when your feet are shoulder width apart. To begin, take short steps forward alternating your left and right foot. After several steps, do just the opposite and walk backward to where you started.'
    }

    expect(result['data']['createHealthLog']['healthLog']['loggable']).to include(expected_exercise)
    expect(result['data']['createHealthLog']['errors']).to eq([])
  end
end
