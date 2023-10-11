<<<<<<< HEAD

require_relative '../../lib/helpers/jwt_token_generator'
=======
require_relative '../../lib/helpers/jwt_helper'
>>>>>>> patricia
module Mutations
  class RegisterUserMutation < GraphQL::Schema::Mutation
    field :token, String, null: false

    argument :input, Types::Inputs::RegisterUserMutationInputType, required: true

    def resolve(input:)
      existing_user = User.find_by(email: input[:email]) || User.find_by(username: input[:username])

      if existing_user
        raise GraphQL::ExecutionError, "Registration failed"
      else
        user = User.new(
          username: input[:username],
          email: input[:email],
          password: input[:password],
          birthdate: input[:birthdate],
          gender: input[:gender],
        )


        if user.save
<<<<<<< HEAD
          token = JwtTokenGenerator.generate_token(user)
=======
          token = JwtHelper.generate_token(user)
>>>>>>> patricia
          { token: token }
        else
          raise GraphQL::ExecutionError, user.errors.full_messages.join(", ")
        end
      end
    end
  end
end