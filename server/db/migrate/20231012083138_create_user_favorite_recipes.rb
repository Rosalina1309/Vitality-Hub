class CreateUserFavoriteRecipes < ActiveRecord::Migration[7.1]
  def change
    create_table :user_favorite_recipes do |t|
      t.references :user, type: :uuid, foreign_key: true
      t.references :recipe, type: :bigint, foreign_key: true
      t.timestamps
    end
  end
end
