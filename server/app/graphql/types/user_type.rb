module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :username, String, null: false
    field :email, String, null: false
    field :birthdate, GraphQL::Types::ISO8601Date, null: true
    field :gender, String, null: true
    field :height, Float, null: true
    field :weight, Float, null: true
    field :user_measurements, [UserMeasurementType], null: true
    field :user_goals, [UserGoalType], null: true
  end
end
