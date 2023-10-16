module Types
  module Inputs
    class CreateRecordMutationInputType < GraphQL::Schema::InputObject
      graphql_name 'CreateRecordMutationInput'

      argument :record_type, String, required: true
      argument :personal_goal, String, required: false
      argument :start_date, GraphQL::Types::ISO8601Date, required: false
      argument :end_date, GraphQL::Types::ISO8601Date, required: false
      argument :height, Float, required: false
      argument :weight, Float, required: false
      argument :bmi, Float, required: false
      argument :waist, Float, required: false
      argument :hips, Float, required: false
      argument :whr, Float, required: false
    end
  end
end
