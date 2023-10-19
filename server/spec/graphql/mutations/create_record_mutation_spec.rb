require_relative '../../rails_helper'
require_relative './jwt_helper'

RSpec.describe 'Mutations::CreateRecordMutation', type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:valid_jwt_token) { JwtHelper.generate_token(user) }

  it 'creates a UserGoal record' do
    graphql_query = <<~GRAPHQL
      mutation CreateUserGoal {
        createRecord(input: {
          recordType: "UserGoal",
          personalGoal: "Get fit",
          startDate: "2023-01-01",
          endDate: "2023-12-31"
        }) {
          record {
            ... on UserGoal {
              id
              personalGoal
              startDate
              endDate
            }
          }
        }
      }
    GRAPHQL

    context = { jwt_token: valid_jwt_token }

    post '/graphql', params: { query: graphql_query }, headers: { 'Authorization' => "Bearer #{valid_jwt_token}" }

    expect(response.status).to eq(200)
    result = JSON.parse(response.body)
    user_goal_data = result['data']['createRecord']['record']

    expect(user_goal_data['personalGoal']).to eq('Get fit')
    expect(user_goal_data['startDate']).to eq('2023-01-01')
    expect(user_goal_data['endDate']).to eq('2023-12-31')
  end

  it 'creates a BmiMeasurement record' do
    graphql_query = <<~GRAPHQL
      mutation CreateBmiMeasurement {
        createRecord(input: {
          recordType: "BmiMeasurement",
          height: 180.0,
          weight: 75.0,
          bmi: 23.15
        }) {
          record {
            ... on BmiMeasurement {
              id
              height
              weight
              bmi
            }
          }
        }
      }
    GRAPHQL

    context = { jwt_token: valid_jwt_token }

    post '/graphql', params: { query: graphql_query }, headers: { 'Authorization' => "Bearer #{valid_jwt_token}" }

    expect(response.status).to eq(200)
    result = JSON.parse(response.body)
    bmi_measurement_data = result['data']['createRecord']['record']

    expect(bmi_measurement_data['height']).to eq(180.0)
    expect(bmi_measurement_data['weight']).to eq(75.0)
    expect(bmi_measurement_data['bmi']).to eq(23.15)
  end

  it 'creates a WhrMeasurement record' do
    graphql_query = <<~GRAPHQL
      mutation CreateWhrMeasurement {
        createRecord(input: {
          recordType: "WhrMeasurement",
          waist: 80.0,
          hips: 100.0,
          whr: 0.8
        }) {
          record {
            ... on WhrMeasurement {
              id
              waist
              hips
              whr
            }
          }
        }
      }
    GRAPHQL

    context = { jwt_token: valid_jwt_token }

    post '/graphql', params: { query: graphql_query }, headers: { 'Authorization' => "Bearer #{valid_jwt_token}" }

    expect(response.status).to eq(200)
    result = JSON.parse(response.body)
    whr_measurement_data = result['data']['createRecord']['record']

    expect(whr_measurement_data['waist']).to eq(80.0)
    expect(whr_measurement_data['hips']).to eq(100.0)
    expect(whr_measurement_data['whr']).to eq(0.8)
  end
end