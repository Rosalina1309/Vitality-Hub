require_relative '../../lib/helpers/jwt_token_generator'
module Mutations
  class RegisterUserMutation < GraphQL::Schema::Mutation
    field :token, String, null: false

    argument :input, Types::Inputs::RegisterUserMutationInputType, required: true

    def resolve(input:)
      puts "Received input: #{input.inspect}"
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
          token = JwtTokenGenerator.generate_token(user)
          { token: token }
        else
          raise GraphQL::ExecutionError, user.errors.full_messages.join(", ")
        end
      end
    end
  end
end
