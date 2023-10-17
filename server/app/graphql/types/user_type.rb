module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :username, String, null: false
    field :email, String, null: false
    field :birthdate, GraphQL::Types::ISO8601Date, null: true
    field :gender, String, null: true
    field :bmi_measurements, [BmiMeasurementType], null: true
    field :whr_measurements, [WhrMeasurementType], null: true
    field :user_goals, [UserGoalType], null: true
    field :favorite_recipes, [UserFavoriteRecipeType], null: true
    field :favorite_exercises, [UserFavoriteExerciseType], null: true
    field :health_logs, [HealthLogType], null: true
  end

  def bmi_measurements
    object.bmi_measurements
  end

  def whr_measurement
    object.whr_measurements
  end

  def user_goals
    object.user_goals
  end

  def favorite_exercises
    user_id = object.id
    favorite_exercises = FavoriteExercise.where(user_id: user_id).pluck(:exercise_id)
    exercises = Exercise.where(id: favorite_exercises)
    exercises
  end

  def favorite_recipes
    user_id = object.id
    favorite_recipes = FavoriteRecipe.where(user_id: user_id).pluck(:recipe_id)
    recipes = Recipe.where(id: favorite_recipes)
    recipes
  end

  def health_logs
    object.health_logs
  end
end