module Mutations
  class ToggleFavoriteMutation < GraphQL::Schema::Mutation
    argument :type, String, required: true
    argument :item_id, ID, required: true

    field :user, Types::UserType, null: true
    field :favorited_item, Types::Unions::ExerciseOrRecipeUnionType, null: true

    def resolve(type:, item_id:)
      user_id = JwtHelper.verify_jwt_token(context[:jwt_token])
      user = User.find(user_id)

      if user
        favorited_item = nil

        case type
        when "recipe"
          item = Recipe.find(item_id)
          if user.favorite_recipes.include?(item)
            user.favorite_recipes.delete(item)
          else
            user.favorite_recipes << item
            favorited_item = item
          end
        when "exercise"
          item = Exercise.find(item_id)
          if user.favorite_exercises.include?(item)
            user.favorite_exercises.delete(item)
          else
            user.favorite_exercises << item
            favorited_item = item
          end
        end

        user.save

        { user: user, favorited_item: favorited_item }
      end
    end
  end
end
