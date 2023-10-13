class CreateRecipes < ActiveRecord::Migration[7.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :image
      t.integer :calories
      t.integer :protein
      t.integer :fat
      t.integer :carbs
    end
  end
end
