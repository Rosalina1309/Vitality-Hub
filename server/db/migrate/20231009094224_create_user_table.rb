class CreateUserTable < ActiveRecord::Migration[7.1]
  def change
    enable_extension 'pgcrypto'

    create_table :users, id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
      t.string :username, null: false
      t.string :email, null: false
      t.date :birthdate
      t.string :gender
      t.string :password_digest, null: false

      t.timestamps

      t.index :id, unique: true
      t.index :username, unique: true
      t.index :email, unique: true
    end
  end
end
