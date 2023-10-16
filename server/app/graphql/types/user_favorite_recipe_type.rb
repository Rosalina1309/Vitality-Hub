module Types
  class UserFavoriteRecipeType < Types::BaseObject
    field :id, ID, null: false
    field :user_id, ID, null: false
    field :recipe_id, ID, null: false
    field :recipe, RecipeType, null: false

    def recipe_id
      object.id
    end

    def recipe
      object
    end
  end
end