require 'net/http'

class AjaxCountersController < ApplicationController

  def upd_data

    if params[:counter_id] && params[:counter]
      session[params[:counter_id]] = {count: params[:counter], time: Time.now, period: params[:period]}
    end
    render :json => {counter: params[:counter], counter_id: params[:counter_id]}
  end

end