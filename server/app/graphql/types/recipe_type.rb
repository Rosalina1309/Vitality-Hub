module Types
  class RecipeType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :image, String, null: false
    field :calories, Float, null: false
    field :protein, String, null: false
    field :fat, String, null: false
    field :carbs, String, null: false
  end
end
