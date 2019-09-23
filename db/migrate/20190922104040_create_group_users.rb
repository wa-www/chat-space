class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    add_foreign_key "group_users", "users"
    add_foreign_key "group_users", "groups"
  end
end