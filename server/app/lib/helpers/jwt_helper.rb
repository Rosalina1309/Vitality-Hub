require 'jwt'

module JwtHelper
  def self.generate_token(user)
    secret_key = 'futurekeyin.env'

    payload = {
      user_id: user.id,
      username: user.username,
    }

    JWT.encode(payload, secret_key, 'HS256')
  end

  def self.verify_jwt_token(token)
    return nil if token.blank?
    puts "#{token}"
    decoded_token = JWT.decode(token, 'futurekeyin.env', true, algorithm: 'HS256')
    user_id = decoded_token[0]['user_id']
    return user_id
  rescue JWT::DecodeError
    nil
  end
end