require 'jwt'

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
          token = generate_jwt_token(user)
          { token: token }
        else
          raise GraphQL::ExecutionError, user.errors.full_messages.join(", ")
        end
      end
    end

    def generate_jwt_token(user)
      secret_key = 'YOUR_SECRET_KEY'

      payload = {
        user_id: user.id,
        username: user.username,
      }

      token = JWT.encode(payload, secret_key, 'HS256')
      token
    end
  end
end
