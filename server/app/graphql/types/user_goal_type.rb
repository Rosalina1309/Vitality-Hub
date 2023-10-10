module Types
  class UserGoalType < Types::BaseObject
    field :id, ID, null: false
    field :user_id, ID, null: false
    field :personal_goal, String, null: true
    field :start_date, GraphQL::Types::ISO8601Date, null: true
    field :end_date, GraphQL::Types::ISO8601Date, null: true
  end
end