require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'should be valid' do
    user = User.new(username: 'testuser', email: 'test@example.com', age: 25)
    assert user.valid?
  end

  test 'should require a username' do
    user = User.new(email: 'test@example.com', age: 25)
    assert_not user.valid?
  end

  test 'should require a valid email' do
    user = User.new(username: 'testuser', email: 'invalid_email', age: 25)
    assert_not user.valid?
  end

  test 'should require a valid age' do
    user = User.new(username: 'testuser', email: 'test@example.com', age: -5)
    assert_not user.valid?
  end
end
