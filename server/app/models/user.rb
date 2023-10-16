class User < ApplicationRecord
  include ActiveModel::SecurePassword
  has_secure_password


  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, email: true, uniqueness: true
  validates :birthdate, presence: true, allow_blank: true
  validates :password, presence: true, length: { minimum: 6 }
  validates :gender, inclusion: { in: %w(male female), message: 'is not a valid gender' }, allow_blank: true
  validates :password_digest, presence: true, length: { minimum: 6 }

  validates_comparison_of :birthdate, less_than: ->(date) { Date.today }, allow_blank: true

  has_many :bmi_measurements
  has_many :whr_measurements
  has_many :user_goals
  has_many :health_logs

  has_many :user_favorite_recipes
  has_many :favorite_recipes, through: :user_favorite_recipes, source: :recipe

  has_many :user_favorite_exercises
  has_many :favorite_exercises, through: :user_favorite_exercises, source: :exercise
end
