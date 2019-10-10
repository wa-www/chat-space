# json.(@message, :content, :image.url)
json.content  @message.content
json.image  @message.image.url
json.user_name  @message.user.name
json.created_at @message.created_at.strftime("%Y-%m-%d %H:%M")
json.id @message.id
# json.group_id message.group_id
