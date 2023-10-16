require './spec/spec_helper.rb'
require './spec/rails_helper'

RSpec.describe User, type: :model do
  it 'validates presence of username' do
    user = User.new(email: 'patri@test.com', password: '123456')
    expect(user).not_to be_valid
  end

  it 'validates presence of email' do
    user = User.new(username: 'patri test', email: 'patri@test.com', password: '123456')
    expect(user).to be_valid
  end

  it 'validates that the password can\'t be less than 6 characters long' do
    user = User.new(username: 'patri test', email: 'patri@test.com', password: '123')
    expect(user).not_to be_valid
  end

  it 'validates that the birthdate can\'t be after today' do
    user = User.new(username: 'patri test', email: 'patri@test.com', password: '123456', birthdate: '2023/10/15')
    expect(user).not_to be_valid
  end

  it 'validates that the gender can only be male or female' do
    user = User.new(username: 'patri test', email: 'patri@test.com', password: '123456', gender: 'mock')
    expect(user).not_to be_valid
    userA = User.new(username: 'patri a test', email: 'patria@test.com', password: '123456', gender: 'female')
    expect(userA).to be_valid
    userB = User.new(username: 'patro b test', email: 'patrob@test.com', password: '123456', gender: 'male')
    expect(userB).to be_valid
  end

  it 'creates a valid user when all fields are valid' do
    user = User.new(username: 'patri test', email: 'patri@test.com', password: '123456', birthdate: '2000/10/15')
    expect(user).to be_valid
  end
end
