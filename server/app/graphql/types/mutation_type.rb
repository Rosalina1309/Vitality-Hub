module Types
  class MutationType < Types::BaseObject
    field :create_record, mutation: Mutations::CreateRecordMutation
    field :login, mutation: Mutations::LoginMutation
    field :register_user, mutation: Mutations::RegisterUserMutation
  end
end
