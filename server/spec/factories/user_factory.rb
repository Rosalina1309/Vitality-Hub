FactoryBot.define do
  factory :user do
    id { 'cd0d6a19-a8cc-4578-81f6-728874ffe124' }
    sequence(:username) { |n| "user#{n}" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password { '123456' }
    birthdate { '2000-01-01' }
    gender { 'female' }
  end
end
