class CreateHeartPaymentsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :heart_payments do |t|
      t.integer :user_id
      t.integer :heart_paid
      t.datetime :updated_at
    end
  end
end
