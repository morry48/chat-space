class Api::MessagesController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json do
        @messages= Group.find(params[:group_id]).messages.where('id>?',params[:last_message_id])
      end
    end
  end
end
