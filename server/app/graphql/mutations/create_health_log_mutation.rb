module Mutations
  class CreateHealthLogMutation < GraphQL::Schema::Mutation
    argument :input, Types::Inputs::CreateHealthLogMutationInputType, required: true

    field :health_log, Types::HealthLogType, null: true
    field :errors, [String], null: true

    def resolve(input:)
      user_id = JwtHelper.verify_jwt_token("#{context[:jwt_token]}")

      user = User.find_by(id: user_id)
      return GraphQL::ExecutionError.new("User not found") if user.nil?

      loggable_type = input.loggable_type
      loggable_id = input.loggable_id

      loggable = Exercise.find(loggable_id) if loggable_type == 'Exercise'
      loggable = Recipe.find(loggable_id) if loggable_type == 'Recipe'

      if loggable.nil?
        return { health_log: nil, errors: ['Exercise or Recipe not found'] }
      end

      health_log = HealthLog.new(user: user, loggable: loggable, date: Time.now)

      if health_log.save
        { health_log: health_log, errors: [] }
      else
        { health_log: nil, errors: health_log.errors.full_messages }
      end
    end
  end
end