module Types
  module Inputs
    class CreateGoalInputType < BaseInputObject
      graphql_name "CreateGoalInput"

      argument :user_id, ID, required: true
      argument :personal_goal, String, required: true
      argument :start_date, GraphQL::Types::ISO8601Date, required: true
      argument :end_date, GraphQL::Types::ISO8601Date, required: true
    end
  end
end
