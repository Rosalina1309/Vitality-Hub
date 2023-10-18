FactoryBot.define do
  factory :exercise do
    id { '18' }
    name { 'Monster Walk' }
    type { 'strength' }
    muscle { 'abductors' }
    equipment { 'body_only' }
    difficulty { 'intermediate' }
    instructions { 'Place a band around both ankles and another around both knees. There should be enough tension that they are tight when your feet are shoulder width apart. To begin, take short steps forward alternating your left and right foot. After several steps, do just the opposite and walk backward to where you started.' }
  end
end
