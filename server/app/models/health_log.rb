class HealthLog < ApplicationRecord
  belongs_to :user
  belongs_to :loggable, polymorphic: true

  validate :valid_loggable_type

  private

  def valid_loggable_type
    unless loggable.is_a?(Exercise) || loggable.is_a?(Recipe)
      errors.add(:loggable, "must be an Exercise or Recipe")
    end
  end
end
