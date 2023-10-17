class BmiMeasurement < ApplicationRecord
  belongs_to :user

  validates :height, numericality: { greater_than: 0 }
  validates :weight, numericality: { greater_than: 0 }
  validates :bmi, numericality: { greater_than: 0 }
end