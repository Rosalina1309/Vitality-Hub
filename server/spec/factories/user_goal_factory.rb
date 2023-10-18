FactoryBot.define do
  factory :user_goal do
    personal_goal { 'Finish the bootcamp' }
    start_date { Date.today }
    end_date { '2023-10-27' }
    association :user, factory: :user
  end
end
