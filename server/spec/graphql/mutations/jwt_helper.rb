require 'jwt'

module JwtHelper
  def self.generate_token(user)
    secret_key = ENV['SECRET_KEY']
    payload = {
      user_id: user.id,
      username: user.username,
    }

    JWT.encode(payload, secret_key, ENV['JWT_ALG'])
  end

  def self.verify_jwt_token(token)
    return nil if token.blank?

    secret_key = ENV['SECRET_KEY']
    decoded_token = JWT.decode(token, secret_key, true, algorithm: ENV['JWT_ALG'])
    user_id = decoded_token[0]['user_id']
    return user_id
  rescue JWT::DecodeError
    nil
  end
end