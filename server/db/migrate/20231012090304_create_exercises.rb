class CreateExercises < ActiveRecord::Migration[7.1]
  def change
    create_table :exercises do |t|
      t.string :name
      t.string :type
      t.string :muscle
      t.string :equipment
      t.string :difficulty
      t.text :instructions
    end
  end
end
