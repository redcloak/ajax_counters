require 'net/http'

class AjaxCountersController < ApplicationController

  def upd_data
    if params[:counter_id] && params[:counter] && params[:period].to_i > 0
      session[params[:counter_id]] = {c: params[:counter], t: Time.now, p: params[:period]}
    end
    render :json => {counter: params[:counter], counter_id: params[:counter_id]}
  end

end