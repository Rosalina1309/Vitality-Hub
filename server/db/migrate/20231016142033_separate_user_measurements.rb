require_relative '../../app/models/user_measurement'

class SeparateUserMeasurements < ActiveRecord::Migration[7.1]
  def up
    create_table :bmi_measurements do |t|
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.float :height
      t.float :weight
      t.float :bmi
      t.timestamps
    end

    create_table :whr_measurements do |t|
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.float :waist
      t.float :hips
      t.float :whr
      t.timestamps
    end

    UserMeasurement.where.not(height: nil, weight: nil, bmi: nil).find_each do |measurement|
      BmiMeasurement.create(
        user_id: measurement.user_id,
        height: measurement.height,
        weight: measurement.weight,
        bmi: measurement.bmi
      )
    end

    UserMeasurement.where.not(waist: nil, hips: nil, whr: nil).find_each do |measurement|
      WhrMeasurement.create(
        user_id: measurement.user_id,
        waist: measurement.waist,
        hips: measurement.hips,
        whr: measurement.whr
      )
    end

    drop_table :user_measurements
  end

  def down
    create_table :user_measurements do |t|
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.float :height
      t.float :weight
      t.float :bmi
      t.float :waist
      t.float :hips
      t.float :whr
      t.string :measurement_unit
      t.timestamps
    end

    BmiMeasurement.find_each do |measurement|
      UserMeasurement.create(
        user_id: measurement.user_id,
        height: measurement.height,
        weight: measurement.weight,
        bmi: measurement.bmi
      )
    end

    WhrMeasurement.find_each do |measurement|
      UserMeasurement.create(
        user_id: measurement.user_id,
        waist: measurement.waist,
        hips: measurement.hips,
        whr: measurement.whr
      )
    end

    drop_table :bmi_measurements
    drop_table :whr_measurements
  end
end
