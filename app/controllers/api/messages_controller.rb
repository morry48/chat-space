class Api::MessagesController < ApplicationController
  before_action :set_group
  def index
    respond_to do |format|
      format.html
      format.json do
        @messages=@group.messages.where('id>?',params[:lastMessageId])
      end
    end
  end
end

  def set_group
    @group=Group.find(params[:group_id])
  end
