class CreateMeetingDetailsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :meeting_details do |t|
      t.datetime :starting_date #need check
      t.datetime :mid_date #need check
      t.datetime :meeting_date #need check
      t.string :location
      t.integer :cutline
    end
  end
end
