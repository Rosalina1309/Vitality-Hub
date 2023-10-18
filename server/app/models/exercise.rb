class Exercise < ApplicationRecord
  self.inheritance_column = :_type_disabled

  validates :name, presence: true
  validates :type, presence: true
  validates :muscle, presence: true
  validates :equipment, presence: true
  validates :difficulty, presence: true
  validates :instructions, presence: true

  has_many :user_favorite_exercises
  has_many :favorited_by, through: :user_favorite_exercises, source: :user
end
