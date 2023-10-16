# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :user, Types::UserType, null: true, description: "Get a user by ID"

    def user
      user_id = JwtHelper.verify_jwt_token(context[:jwt_token])
      user = User.find_by(id: user_id)
      user
    end

    field :recipes, [Types::RecipeType], null: true, description: "Get all recipes"

    def recipes
      allRecipes = Recipe.all
      allRecipes
    end

    field :exercises, [Types::ExerciseType], null: true, description: "Get all exercises"
    def exercises
      allExercises = Exercise.all
      allExercises
    end

    field :exercises_by_muscle, [Types::ExerciseType], null: true, description: "Get exercises by muscle" do
      argument :muscle, String, required: true, description: "The muscle name to filter exercises"
    end

    def exercises_by_muscle(muscle:)
      result = Exercise.where(muscle: muscle.downcase)
      result
    end
  end
end
