class ServerSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  # Use GraphQL DataLoader for batch loading (if needed).
  use GraphQL::Dataloader

  # Implement type_error to handle type errors during execution.
  def self.type_error(err, context)
    # Handle type errors (e.g., logging or custom error handling)
    # For example:
    Rails.logger.error("GraphQL Type Error: #{err.message}")
    nil # You can choose to return nil or handle the error differently
  end

  def self.resolve_type(abstract_type, obj, ctx)
    case obj
    when Exercise
      Types::ExerciseType
    else
      nil # Return nil for unknown types
    end
  end

  # Define the maximum number of validation errors before stopping execution.
  validate_max_errors(100)

  # Relay-style Object Identification:

  # Define how to generate a string UUID from an object.
  def self.id_from_object(object, type_definition, query_ctx)
    # For example, you can use Rails' GlobalID library:
    object.to_gid_param
  end

  # Define how to find an object given a string UUID.
  def self.object_from_id(global_id, query_ctx)
    # For example, use Rails' GlobalID library:
    GlobalID.find(global_id)
  end
end
