class CreateHealthLogs < ActiveRecord::Migration[7.1]
  def change
    create_table :health_logs do |t|
      t.references :user, type: :uuid, null: false, foreign_key: true
      t.datetime :date, default: -> { 'CURRENT_TIMESTAMP' }
      t.references :loggable, polymorphic: true, null: false
    end
  end
end
