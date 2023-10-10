class User < ApplicationRecord
  include ActiveModel::SecurePassword
  has_secure_password


  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, email: true, uniqueness: true
  validates :birthdate, presence: true, allow_blank: true
  validates :gender, inclusion: { in: %w(male female other), message: 'is not a valid gender' }, allow_blank: true
  validates :password_digest, presence: true, length: { minimum: 6 }

  validates_comparison_of :birthdate, less_than: ->(date) { Date.today }, allow_blank: true

  has_many :user_measurements
  has_many :user_goals
end
