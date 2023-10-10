class UserMeasurement < ApplicationRecord
  belongs_to :user

  validates :height, numericality: { greater_than: 0 }, allow_nil: true
  validates :weight, numericality: { greater_than: 0 }, allow_nil: true
  validates :measurement_unit, inclusion: { in: %w(metric imperial), message: 'is not a valid measurement unit' }, allow_nil: false, unless: -> { height.nil? && weight.nil? }
end