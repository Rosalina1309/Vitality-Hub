require './spec/spec_helper.rb'
require './spec/rails_helper'

RSpec.describe UserGoal, type: :model do
  before(:all) do
    @user = User.create(username: 'patri_test', email: 'patri@test.com', password: '123456')
  end

  after(:all) do
    @user.destroy
  end

  it 'validates that personal goal is not null' do
    user_goal = UserGoal.new(user: @user, personal_goal: nil, start_date: '2023-07-17')
    expect(user_goal).not_to be_valid
  end

  it 'validates that end_date is after start_date' do
    user_goal = UserGoal.new(user: @user, personal_goal: 'Finish the bootcamp', start_date: '2023/10/14', end_date: '2023-07-17')
    expect(user_goal).not_to be_valid
  end

  it 'validates that the start date can be in the future' do
    user_goal = UserGoal.new(user: @user, personal_goal: 'Finish the bootcamp', start_date: Date.tomorrow, end_date: '2024-07-17')
    expect(user_goal).to be_valid
  end

  it 'a goal with right data is valid' do
    user = UserGoal.new(user: @user, personal_goal: 'Finish the bootcamp', start_date: '2023-07-17', end_date: '2023-10-27')
  end
end
