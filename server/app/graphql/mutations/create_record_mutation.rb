module Mutations
  class CreateRecordMutation < GraphQL::Schema::Mutation
    argument :input, Types::Inputs::CreateRecordMutationInputType, required: true
    field :user, Types::UserType, null: false
    field :record, Types::Unions::CreateRecordUnionType, null: true

    def resolve(input:)
      user_id = JwtHelper.verify_jwt_token("#{context[:jwt_token]}")

      user = User.find_by(id: user_id)
      return GraphQL::ExecutionError.new("User not found") if user.nil?

      record_type = input.record_type

      record_class = record_type.camelize.constantize
      attributes = input.to_h.except(:record_type)
      record = user.public_send(record_class.table_name).build(attributes)

      if record.save
        { record: record }
      else
        GraphQL::ExecutionError.new("Failed to create #{record_type}: #{record.errors.full_messages.join(', ')}")
      end
    end
  end
end
