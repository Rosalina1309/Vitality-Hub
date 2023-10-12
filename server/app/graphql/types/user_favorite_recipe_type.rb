module Types
  class UserFavoriteRecipeType < Types::BaseObject
    field :id, ID, null: false
    field :user_id, ID, null: false
    field :recipe_id, ID, null: false

    def recipe_id
      object.id
    end
  end
end