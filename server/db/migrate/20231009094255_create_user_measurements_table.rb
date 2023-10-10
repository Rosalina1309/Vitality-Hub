class CreateUserMeasurementsTable < ActiveRecord::Migration[7.1]
  def change
    create_table :user_measurements do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.float :height
      t.float :weight
      t.string :measurement_unit
      t.float :bmi
      t.timestamps
    end

    add_index :user_measurements, [:user_id, :created_at]
  end
end
