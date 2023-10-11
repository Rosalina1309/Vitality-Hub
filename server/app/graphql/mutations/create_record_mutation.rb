require_relative '../../lib/helpers/jwt_helper'

module Mutations
  class CreateRecordMutation < GraphQL::Schema::Mutation
    argument :input, Types::Inputs::CreateRecordMutationInputType, required: true
    field :user, Types::UserType, null: false

    def resolve(input:)
      user_id = JwtHelper.verify_jwt_token("#{context[:jwt_token]}")

      user = User.find_by(id: user_id)
      return GraphQL::ExecutionError.new("User not found") if user.nil?

      record_type = input[:field_name]

      record = user.public_send("user_#{record_type}").build(input.to_h.except(:field_name))
      if record.save
        { user: user }
      else
        GraphQL::ExecutionError.new("Failed to create #{record_type}: #{record.errors.full_messages.join(', ')}")
      end
    end
  end
end
