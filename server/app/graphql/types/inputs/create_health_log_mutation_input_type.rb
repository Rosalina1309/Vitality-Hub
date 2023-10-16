module Types
  module Inputs
    class CreateHealthLogMutationInputType < Types::BaseInputObject
      graphql_name 'CreateHealthLogMutationInput'

      argument :loggable_type, String, required: true
      argument :loggable_id, ID, required: true
    end
  end
end
