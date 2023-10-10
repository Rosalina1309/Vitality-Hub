class BirthdateInPastValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value.present? && value > Date.today
      record.errors.add(attribute, "must be in the past")
    end
  end
end

class User < ApplicationRecord
  # include ActiveModel::SecurePassword

  # has_secure_password
  include BCrypt

  def password
    @password ||= Password.new(password_digest)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_digest = @password
  end

  validates :password, presence: true, length: { minimum: 6 }

  # def password=(password)
  #   self.password_digest = BCrypt::Password.create(password)
  # end

  # def authenticate(password)
  #   BCrypt::Password.new(password_digest) == password
  # end

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, email: true, uniqueness: true
  # validates :password, presence: true, length: { minimum: 6 }
  validates :birthdate, presence: true, birthdate_in_past: true, allow_blank: true
  validates :gender, inclusion: { in: %w(male female other), message: 'is not a valid gender' }, allow_blank: true
  validates :password_digest, presence: true, length: { minimum: 6 }

  has_many :user_measurements
  has_many :user_goals

  validate :birthdate_in_past

  def birthdate_in_past
    if birthdate.present? && birthdate > Date.today
      errors.add(:birthdate, "must be in the past")
    end
  end
end