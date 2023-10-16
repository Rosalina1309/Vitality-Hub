module Types
  class HealthLogType < Types::BaseObject
    field :id, ID, null: false
    field :user, UserType, null: false
    field :loggable, Types::Unions::ExerciseOrRecipeUnionType, null: false
    field :date, GraphQL::Types::ISO8601DateTime, null: false
  end
end