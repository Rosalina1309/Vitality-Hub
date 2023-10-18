require_relative '../../rails_helper'
require_relative '../helpers/jwt_helper'

RSpec.describe 'Mutations::ToggleFavoriteMutation', type: :request do
  it 'toggles and untoggles favorite recipe' do
    user = FactoryBot.create(:user)
    recipe = FactoryBot.create(:recipe)
    valid_jwt_token = JwtHelper.generate_token(user)

    graphql_query = <<~GRAPHQL
    mutation ToggleFavoriteRecipe { toggleFavorite(type: "recipe", itemId: "149241") { user { favoriteRecipes { recipeId  } } favoritedItem { ... on Recipe { id title } } } }
    GRAPHQL

    headers = { 'Authorization' => "Bearer #{valid_jwt_token}" }

    post '/graphql', params: { query: graphql_query }, headers: headers


    expect(response.status).to eq(200)
    result = JSON.parse(response.body)

    user_data = result['data']['toggleFavorite']['user']
    favorited_item_data = result['data']['toggleFavorite']['favoritedItem']

    expect(user_data['favoriteRecipes'][0]['recipeId']).to eq('149241')
    expect(favorited_item_data['id']).to eq('149241')
    expect(favorited_item_data['title']).to eq('Stevia-Sweetened Currant Banana Bread')

    headers = { 'Authorization' => "Bearer #{valid_jwt_token}" }

    post '/graphql', params: { query: graphql_query }, headers: headers

    result = JSON.parse(response.body)

    favorited_item_data = result['data']['toggleFavorite']['favoritedItem']
    expect(favorited_item_data).to be_nil
  end

  it 'toggles and untoggles favorite exercise' do
    user = FactoryBot.create(:user)
    exercise = FactoryBot.create(:exercise)
    valid_jwt_token = JwtHelper.generate_token(user)

    graphql_query = <<~GRAPHQL
    mutation ToggleFavoriteExercise { toggleFavorite(type: "exercise", itemId: "18"){ user { favoriteExercises { exerciseId  } } favoritedItem { ... on Exercise { id name } } } }
    GRAPHQL

    headers = { 'Authorization' => "Bearer #{valid_jwt_token}" }

    post '/graphql', params: { query: graphql_query }, headers: headers

    expect(response.status).to eq(200)
    result = JSON.parse(response.body)

    user_data = result['data']['toggleFavorite']['user']
    favorited_item_data = result['data']['toggleFavorite']['favoritedItem']

    expect(user_data['favoriteExercises'][0]['exerciseId']).to eq('18')
    expect(favorited_item_data['id']).to eq('18')
    expect(favorited_item_data['name']).to eq('Monster Walk')

    headers = { 'Authorization' => "Bearer #{valid_jwt_token}" }

    post '/graphql', params: { query: graphql_query }, headers: headers

    result = JSON.parse(response.body)

    favorited_item_data = result['data']['toggleFavorite']['favoritedItem']
    expect(favorited_item_data).to be_nil
  end
end
