require_relative '../../rails_helper'

RSpec.describe 'Mutations::LoginMutation', type: :request do
  before(:all) do
    @user = User.create(username: 'test', email: 'test@test.com', password: 'test123')
  end

  after(:all) do
    @user.destroy
  end

  it 'logs in a user with valid credentials' do
    graphql_query = <<~GRAPHQL
      mutation ($input: LoginMutationInput!) {
        login(input: $input) {
          token
        }
      }
    GRAPHQL

    valid_input = {
      input: {
        usernameOrEmail: 'test',
        password: 'test123',
      }
    }

    post '/graphql', params: { query: graphql_query, variables: valid_input }

    expect(response.status).to eq(200)

    result = JSON.parse(response.body)
    token = result['data']['login']['token']
    decoded_token = JWT.decode(token, nil, false).first
    expect(decoded_token['username']).to eq(valid_input[:input][:usernameOrEmail])
  end

  it 'fails to log in with invalid credentials' do
    graphql_query = <<~GRAPHQL
      mutation ($input: LoginMutationInput!) {
        login(input: $input) {
          token
        }
      }
    GRAPHQL

    invalid_input = {
      input: {
        usernameOrEmail: 'test',
        password: 'asdasdsad',
      }
    }

    post '/graphql', params: { query: graphql_query, variables: invalid_input }

    expect(response.status).to eq(200)
    result = JSON.parse(response.body)
    expect(result['data']['login']).to be_nil
    expect(result['errors']).to be_present
    expect(result['errors'][0]['message']).to include("Invalid credentials")
  end
end
