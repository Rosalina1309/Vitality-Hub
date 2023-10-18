require_relative '../../rails_helper'

RSpec.describe 'Mutations::RegisterUserMutation', type: :request do
  it 'registers a user with valid input' do
    graphql_query = <<~GRAPHQL
      mutation ($input: RegisterUserMutationInput!) {
        registerUser(input: $input) {
          token
        }
      }
    GRAPHQL

    valid_input = {
      input: {
        username: 'patri',
        email: 'patri@example.com',
        password: '123456',
        birthdate: '2000-01-01',
        gender: 'female'
      }
    }

    post '/graphql', params: { query: graphql_query, variables: valid_input }

    expect(response.status).to eq(200)
    result = JSON.parse(response.body)
    jwt_token = result['data']['registerUser']['token']

    decoded_token = JWT.decode(jwt_token, nil, false).first
    token_username = decoded_token['username']

    expect(token_username).to eq(valid_input[:input][:username])
  end

  it 'fails to register with invalid input' do
    graphql_query = <<~GRAPHQL
      mutation ($input: RegisterUserMutationInput!) {
        registerUser(input: $input) {
          token
        }
      }
    GRAPHQL

    invalid_input = {
      input: {
        username: 'patri',
        email: '',
        password: '123456',
      }
    }

    post '/graphql', params: { query: graphql_query, variables: invalid_input }

    expect(response.status).to eq(200)
    result = JSON.parse(response.body)
    expect(result['data']['registerUser']).to be_nil
    expect(result['errors']).to be_present
    expect(result['errors'][0]['message']).to include("Email can't be blank, Email is invalid")
  end
end
