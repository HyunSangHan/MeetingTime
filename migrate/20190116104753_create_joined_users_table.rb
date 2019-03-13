class CreateJoinedUsersTable < ActiveRecord::Migration[5.2]
  def change
    create_table :joined_users do |t|
      t.integer :user_id
      t.integer :meeting_detail_id
      t.integer :total_score
      t.integer :ranking
      t.integer :midranking
      t.boolean :is_male
      t.boolean :is_deleted
      t.datetime :created_at
    end
  end
end
