class CreateUserGoalsTable < ActiveRecord::Migration[7.1]
  def change
    create_table :user_goals do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :personal_goal, null: false
      t.datetime :start_date, null: false
      t.datetime :end_date

      t.timestamps
    end

    add_index :user_goals, [:user_id, :start_date]
  end
end
