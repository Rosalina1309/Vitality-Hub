module Mutations
  class LoginMutation < GraphQL::Schema::Mutation
    field :jwt, String, null: false

    argument :username, String, required: true
    argument :password, String, required: true

    def resolve(username:, password:)
      user = User.find_by(username: username)

      if user&.authenticate(password)
        jwt = generate_jwt_token(user)
        { token: jwt }
      else
        raise GraphQL::ExecutionError, "Invalid credentials"
      end
    end
  end
end