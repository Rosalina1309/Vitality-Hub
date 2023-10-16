module Types
  class MutationType < Types::BaseObject
    field :create_record, mutation: Mutations::CreateRecordMutation
    field :login, mutation: Mutations::LoginMutation
    field :register_user, mutation: Mutations::RegisterUserMutation
    field :toggle_favorite, mutation: Mutations::ToggleFavoriteMutation
    field :create_health_log, mutation: Mutations::CreateHealthLogMutation
  end
end
