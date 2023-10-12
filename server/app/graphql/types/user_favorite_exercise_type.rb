module Types
  class UserFavoriteExerciseType < Types::BaseObject
    field :id, ID, null: false
    field :user_id, ID, null: false
    field :exercise_id, ID, null: false

    def exercise_id
      object.id
    end
  end
end