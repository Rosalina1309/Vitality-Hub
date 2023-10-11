module Types
  module Inputs
    class CreateRecordMutationInputType < GraphQL::Schema::InputObject
      graphql_name 'CreateRecordMutationInput'

      argument :field_name, String, required: true
      argument :height, Float, required: false
      argument :weight, Float, required: false
      argument :bmi, Float, required: false
      argument :waist, Float, required: false
      argument :hips, Float, required: false
      argument :whr, Float, required: false
      argument :measurement_unit, String, required: false
      argument :personal_goal, String, required: false
      argument :start_date, GraphQL::Types::ISO8601Date, required: false
      argument :end_date, GraphQL::Types::ISO8601Date, required: false
    end
  end
end
