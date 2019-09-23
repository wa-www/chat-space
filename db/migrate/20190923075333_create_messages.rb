class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string :content
      t.string :image
      t.bigint :group_id
      t.bigint :user_id
      t.timestamps
    end
    add_foreign_key :messages, :users
    add_foreign_key :messages, :groups
  end
end
