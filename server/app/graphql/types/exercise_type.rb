module Types
  class ExerciseType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :type, String, null: true
    field :muscle, String, null: true
    field :equipment, String, null: true
    field :difficulty, String, null: true
    field :instructions, String, null: true
  end
end
