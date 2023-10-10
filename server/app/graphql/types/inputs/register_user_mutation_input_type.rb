module Types
  module Inputs
    class RegisterUserMutationInputType < BaseInputObject
      graphql_name "RegisterUserMutationInput"

      argument :username, String, required: true
      argument :email, String, required: true
      argument :password, String, required: true
      argument :birthdate, GraphQL::Types::ISO8601Date, required: false
      argument :gender, String, required: false
    end
  end
end