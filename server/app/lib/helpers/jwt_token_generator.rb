require 'jwt'

module JwtTokenGenerator
  def self.generate_token(user)
    secret_key = 'futurekeyin.env'

    payload = {
      user_id: user.id,
      username: user.username,
    }

    JWT.encode(payload, secret_key, 'HS256')
  end
end