class UserFavoriteExercise < ApplicationRecord
  belongs_to :user, class_name: 'User'
  belongs_to :exercise, class_name: 'Exercise'
end