module Types
  class UserMeasurementType < Types::BaseObject
    field :id, ID, null: false
    field :user_id, ID, null: false
    field :height, Float, null: true
    field :weight, Float, null: true
    field :measurement_unit, String, null: true
    field :bmi, Float, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: true
  end
end