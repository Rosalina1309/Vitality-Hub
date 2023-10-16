module Types
  module Unions
    class CreateRecordUnionType < GraphQL::Schema::Union
      possible_types UserGoalType, BmiMeasurementType, WhrMeasurementType

      def self.resolve_type(object, context)
        case object
        when UserGoal
          UserGoalType
        when BmiMeasurement
          BmiMeasurementType
        when WhrMeasurement
          WhrMeasurementType
        else
          raise("Unexpected object type: #{object.class}")
        end
      end
    end
  end
end
