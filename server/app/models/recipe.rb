class Recipe < ApplicationRecord
  validates :id, presence: true, uniqueness: true
  validates :title, presence: true
  validates :image, presence: true
  validates :calories, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :protein, presence: true
  validates :fat, presence: true
  validates :carbs, presence: true

  has_many :user_favorite_recipes
  has_many :favorited_by, through: :user_favorite_recipes, source: :user
end