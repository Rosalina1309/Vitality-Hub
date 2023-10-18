FactoryBot.define do
  factory :user do
    sequence(:username) { |n| "user#{n}" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password { '123456' }
    birthdate { '2000-01-01' }
    gender { 'female' }
  end
end
