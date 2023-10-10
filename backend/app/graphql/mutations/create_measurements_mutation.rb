module Mutations
  class CreateMeasurementsMutation < GraphQL::Schema::Mutation
    field :user, Types::UserType, null: false

    argument :user_id, ID, required: true
    argument :height, Float, required: false
    argument :weight, Float, required: false
    argument :measurement_unit, String, required: false
    argument :bmi, Float, required: false

    def resolve(user_id:, height: nil, weight: nil, measurement_unit: nil, bmi: nil)
      user = User.find_by(id: user_id)
      return GraphQL::ExecutionError.new("User not found") if user.nil?

      measurement = user.user_measurements.build(
        height: height,
        weight: weight,
        measurement_unit: measurement_unit,
        bmi: bmi
      )

      if measurement.save
        { user: user }
      else
        GraphQL::ExecutionError.new("Failed to create measurements: #{measurement.errors.full_messages.join(', ')}")
      end
    end
  end
end
