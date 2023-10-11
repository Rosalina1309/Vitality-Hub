module Types
  module Inputs
    class LoginMutationInputType < BaseInputObject
      graphql_name "LoginMutationInput"

      argument :usernameOrEmail, String, required: true
      argument :password, String, required: true
    end
  end
end

