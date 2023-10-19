require 'jwt'

module Helpers
  module JwtHelper
    def self.generate_token(user)
      secret_key = '55CEC3419F4737A4F2F99D952C962'
      payload = {
        user_id: user.id,
        username: user.username,
      }

      JWT.encode(payload, secret_key, 'HS256')
    end

    def self.verify_jwt_token(token)
      return nil if token.blank?

      secret_key = '55CEC3419F4737A4F2F99D952C962'
      decoded_token = JWT.decode(token, secret_key, true, algorithm: 'HS256')
      user_id = decoded_token[0]['user_id']
      return user_id
    rescue JWT::DecodeError
      nil
    end
  end
end