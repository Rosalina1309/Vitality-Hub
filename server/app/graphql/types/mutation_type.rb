module Types
  class MutationType < Types::BaseObject
    field :create_goal, mutation: Mutations::CreateGoalMutation
    field :create_measurements, mutation: Mutations::CreateMeasurementsMutation
    field :login, mutation: Mutations::LoginMutation
    field :register_user, mutation: Mutations::RegisterUserMutation
  end
end
