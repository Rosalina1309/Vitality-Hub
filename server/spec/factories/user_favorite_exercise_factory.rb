FactoryBot.define do
  factory :user_favorite_exercise do
    association :user, factory: :user
    association :exercise, factory: :exercise
  end
end
