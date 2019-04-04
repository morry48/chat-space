class Api::MessagesController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json do
        @group=Group.find(params[:group_id])
        @messages= @group.messages.where('id>?',params[:lastMessageId])
      end
    end
  end
end
