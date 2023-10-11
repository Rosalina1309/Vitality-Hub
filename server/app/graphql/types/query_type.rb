# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :user, Types::UserType, null: true, description: "Get a user by ID"

    def user
      user_id = JwtHelper.verify_jwt_token(context[:jwt_token])
      user = User.find_by(id: user_id)
      puts "#{user}"
      user
    end
  end
end
