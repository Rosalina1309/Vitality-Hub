module Types
  module Inputs
    class CreateMeasurementsInputType < BaseInputObject
      graphql_name "CreateMeasurementsInput"

      argument :user_id, ID, required: true
      argument :height, Float, required: false
      argument :weight, Float, required: false
      argument :measurement_unit, String, required: false
      argument :bmi, Float, required: false
    end
  end
end