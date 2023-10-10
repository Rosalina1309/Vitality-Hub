module Types
  module Inputs
    class LoginUserInputType < BaseInputObject
      graphql_name "LoginUserInput"

      argument :username, String, required: true
      argument :password, String, required: true
    end
  end
end