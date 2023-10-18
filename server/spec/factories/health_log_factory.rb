FactoryBot.define do
  factory :health_log do
    user
    loggable { build(:exercise) }
  end
end
