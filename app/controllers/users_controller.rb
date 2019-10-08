class UsersController < ApplicationController
 

  def index
    # @users = User.where('name LIKE(?)', "%#{params[:keyword]}%")
    # where.notを追加記述します。 
    # @users = User.where.not(id: @ids).where('name LIKE(?) and (id!=?)', "%#{params[:keyword]}%","#{current_user.id}")
    @users = User.where('name LIKE(?) and (id!=?)', "%#{params[:keyword]}%","#{current_user.id}").where.not(id: params[:group_users_id])
    # render json: @users
    binding.pry
    respond_to do |format| 
      format.json 
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def user_params
    params.require(:user).permit(:name, :email)
  end

end