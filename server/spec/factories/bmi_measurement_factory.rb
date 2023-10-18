FactoryBot.define do
  factory :bmi_measurement do
    association :user, factory: :user
    height { 175 }
    weight { 70 }
    bmi { 22.86 }
  end
end
