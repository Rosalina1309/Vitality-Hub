module Types
  class FavoritableItemType < Types::BaseUnion
    possible_types Types::UserFavoriteRecipeType, Types::UserFavoriteExerciseType
  end
end
