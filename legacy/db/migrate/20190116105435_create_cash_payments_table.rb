class CreateCashPaymentsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :cash_payments do |t|
      t.integer :user_id
      t.integer :cash_paid
      t.integer :heart_gotten
      t.string :device_platform
      t.string :iap_token
      t.datetime :updated_at
    end
  end
end
