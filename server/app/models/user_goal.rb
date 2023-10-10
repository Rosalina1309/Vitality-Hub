class UserGoal < ApplicationRecord
  belongs_to :user

  validates :personal_goal, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true

  validate :end_date_after_start_date

  private

  def end_date_after_start_date
    if start_date.present? && end_date.present? && end_date < start_date
      errors.add(:end_date, 'must be after the start date')
    end
  end
end