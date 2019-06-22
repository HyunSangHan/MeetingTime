class CreateCompaniesTable < ActiveRecord::Migration[5.2]
  def change
    create_table :companies do |t|
      t.string :name
      t.string :domain
    end
  end
end
