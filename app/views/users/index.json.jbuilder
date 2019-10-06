json.array! @users do |user|
  json.id = user.id
  json.groupname user.group.name  
  # user.groups.name? でもgroupは一つだからあっている？
  json.name user.name
end