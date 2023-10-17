require './spec/spec_helper.rb'
require './spec/rails_helper'

RSpec.describe UserMeasurement, type: :model do
  before(:all) do
    @user = User.create(username: 'patri_test', email: 'patri@test.com', password: '123456')
  end

  after(:all) do
    @user.destroy
  end

  it 'doesn\'t allow to post measurements with no data' do
    measurement = UserMeasurement.new(user: @user)
    expect(measurement).not_to be_valid
  end

  it 'doesn\'t allow to post measurements with no measurement unit if there is any measurement input' do
    measurement = UserMeasurement.new(user: @user, height: 170)
    expect(measurement).not_to be_valid
    measurement = UserMeasurement.new(user: @user, weight: 60)
    expect(measurement).not_to be_valid
    measurement = UserMeasurement.new(user: @user, bmi: 20)
    expect(measurement).not_to be_valid
    measurement = UserMeasurement.new(user: @user, waist: 80)
    expect(measurement).not_to be_valid
    measurement = UserMeasurement.new(user: @user, hips: 90)
    expect(measurement).not_to be_valid
    measurement = UserMeasurement.new(user: @user, whr: 0.85)
    expect(measurement).not_to be_valid
  end
end
