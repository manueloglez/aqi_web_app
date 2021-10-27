class CreateCities < ActiveRecord::Migration[6.1]
  def change
    create_table :cities do |t|
      t.string :name
      t.float :location, array: true, :default => []
      t.timestamps
    end
  end
end
