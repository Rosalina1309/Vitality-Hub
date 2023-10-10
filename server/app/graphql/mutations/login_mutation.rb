require_relative '../../lib/helpers/jwt_token_generator'
module Mutations
  class LoginMutation < GraphQL::Schema::Mutation
    field :token, String, null: false

    argument :input, Types::Inputs::LoginMutationInputType, required: true

    def resolve(input:)
      user = User.find_by(username: input[:usernameOrEmail]) || User.find_by(email: input[:usernameOrEmail])

      if user&.authenticate(input[:password])
        jwt = JwtTokenGenerator.generate_token(user)
        { token: jwt }
      else
        raise GraphQL::ExecutionError, "Invalid credentials"
      end
    end
  end
end