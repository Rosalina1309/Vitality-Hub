module Types
  class WhrMeasurementType < Types::BaseObject
    field :id, ID, null: false
    field :user, UserType, null: false
    field :waist, Float, null: true
    field :hips, Float, null: true
    field :whr, Float, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: true
  end
end