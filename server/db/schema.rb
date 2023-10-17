# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2023_10_16_142033) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "bmi_measurements", force: :cascade do |t|
    t.uuid "user_id", null: false
    t.float "height"
    t.float "weight"
    t.float "bmi"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_bmi_measurements_on_user_id"
  end

  create_table "exercises", force: :cascade do |t|
    t.string "name"
    t.string "type"
    t.string "muscle"
    t.string "equipment"
    t.string "difficulty"
    t.text "instructions"
  end

  create_table "health_logs", force: :cascade do |t|
    t.uuid "user_id", null: false
    t.datetime "date", default: -> { "CURRENT_TIMESTAMP" }
    t.string "loggable_type", null: false
    t.bigint "loggable_id", null: false
    t.index ["loggable_type", "loggable_id"], name: "index_health_logs_on_loggable"
    t.index ["user_id"], name: "index_health_logs_on_user_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.string "title"
    t.string "image"
    t.integer "calories"
    t.integer "protein"
    t.integer "fat"
    t.integer "carbs"
  end

  create_table "user_favorite_exercises", force: :cascade do |t|
    t.uuid "user_id"
    t.integer "exercise_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exercise_id"], name: "index_user_favorite_exercises_on_exercise_id"
    t.index ["user_id"], name: "index_user_favorite_exercises_on_user_id"
  end

  create_table "user_favorite_recipes", force: :cascade do |t|
    t.uuid "user_id"
    t.bigint "recipe_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_user_favorite_recipes_on_recipe_id"
    t.index ["user_id"], name: "index_user_favorite_recipes_on_user_id"
  end

  create_table "user_goals", force: :cascade do |t|
    t.uuid "user_id", null: false
    t.string "personal_goal", null: false
    t.datetime "start_date", null: false
    t.datetime "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "start_date"], name: "index_user_goals_on_user_id_and_start_date"
    t.index ["user_id"], name: "index_user_goals_on_user_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.date "birthdate"
    t.string "gender"
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["id"], name: "index_users_on_id", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "whr_measurements", force: :cascade do |t|
    t.uuid "user_id", null: false
    t.float "waist"
    t.float "hips"
    t.float "whr"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_whr_measurements_on_user_id"
  end

  add_foreign_key "bmi_measurements", "users"
  add_foreign_key "health_logs", "users"
  add_foreign_key "user_favorite_exercises", "exercises"
  add_foreign_key "user_favorite_exercises", "users"
  add_foreign_key "user_favorite_recipes", "recipes"
  add_foreign_key "user_favorite_recipes", "users"
  add_foreign_key "user_goals", "users"
  add_foreign_key "whr_measurements", "users"
end
