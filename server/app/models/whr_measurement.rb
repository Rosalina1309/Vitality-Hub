class WhrMeasurement < ApplicationRecord
  belongs_to :user

  validates :waist, numericality: { greater_than: 0 }
  validates :hips, numericality: { greater_than: 0 }
  validates :whr, numericality: { greater_than: 0 }
end