class CreateUserFavoriteExercises < ActiveRecord::Migration[7.1]
  def change
    create_table :user_favorite_exercises do |t|
      t.references :user, type: :uuid, foreign_key: true
      t.references :exercise, type: :integer, foreign_key: true
      t.timestamps
    end
  end
end
