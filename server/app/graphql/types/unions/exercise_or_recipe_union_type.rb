module Types
  module Unions
    class ExerciseOrRecipeUnionType < GraphQL::Schema::Union
      possible_types ExerciseType, RecipeType

      def self.resolve_type(obj, ctx)
        case obj
        when Exercise
          ExerciseType
        when Recipe
          RecipeType
        else
          raise("Unexpected object: #{obj}")
        end
      end
    end
  end
end
