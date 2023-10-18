FactoryBot.define do
  factory :whr_measurement do
    waist { 70 }
    hips { 80 }
    whr { 0.85 }
    association :user, factory: :user
  end
end
