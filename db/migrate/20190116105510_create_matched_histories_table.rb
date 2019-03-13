class CreateMatchedHistoriesTable < ActiveRecord::Migration[5.2]
  def change
    create_table :matched_histories do |t|
      t.integer :user_female_id
      t.integer :user_male_id
      t.integer :meeting_detail_id
    end
  end
end
