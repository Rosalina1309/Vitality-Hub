module Mutations
  class CreateGoalMutation < GraphQL::Schema::Mutation
    field :goal, Types::UserGoalType, null: false

    argument :user_id, ID, required: true
    argument :personal_goal, String, required: true
    argument :start_date, GraphQL::Types::ISO8601Date, required: true
    argument :end_date, GraphQL::Types::ISO8601Date, required: true

    def resolve(user_id:, personal_goal:, start_date:, end_date:)
      user = User.find_by(id: user_id)
      return GraphQL::ExecutionError.new("User not found") if user.nil?

      goal = user.user_goals.build(
        personal_goal: personal_goal,
        start_date: start_date,
        end_date: end_date
      )

      if goal.save
        { goal: goal }
      else
        GraphQL::ExecutionError.new("Failed to create goal: #{goal.errors.full_messages.join(', ')}")
      end
    end
  end
end