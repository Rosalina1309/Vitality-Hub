class UserMeasurement < ApplicationRecord
  belongs_to :user

  validates :height, numericality: { greater_than: 0 }, allow_nil: true
  validates :weight, numericality: { greater_than: 0 }, allow_nil: true
  validates :bmi, numericality: { greater_than: 0 }, allow_nil: true
  validates :waist, numericality: { greater_than: 0 }, allow_nil: true
  validates :hips, numericality: { greater_than: 0 }, allow_nil: true
  validates :whr, numericality: { greater_than: 0 }, allow_nil: true
  validates :measurement_unit, inclusion: { in: %w(metric imperial), message: 'is not a valid measurement unit' }, allow_nil: false

  validate :at_least_one_measurement_present

  private

  def at_least_one_measurement_present
    measurement_fields = %i[height weight bmi waist hips whr]
    valid_measurements = measurement_fields.any? { |field| self[field].present? }
    if !valid_measurements
      errors.add(:base, "At least one measurement field must be present")
    end
  end
end