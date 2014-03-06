require 'net/http'

class AjaxCountersController < ApplicationController

  # def get_data
  #   # url_md5 = Digest::MD5.hexdigest(params[:url])
  #   id = params[:span_id].to_sym
  #   expired = true
  #   counter = '?'
  #   session[:ajax_counters] = {} unless session[:ajax_counters]
  #   if session[:ajax_counters][id].is_a?(Hash)
  #     counter = session[:ajax_counters][id][:counter]
  #     expired = (session[:ajax_counters][id][:last_refresh]+params[:freq].to_i.seconds < Time.now) ? true : false
  #   end

  #   render :json => {counter: counter, expired: expired, span_id: id}
  # end

  def upd_data
    session[:ajax_counters] = {} unless session[:ajax_counters].is_a?(Hash)

    if params[:span_id] && params[:counter]
      session[:ajax_counters][params[:span_id].to_sym] = {counter: params[:counter], last_refresh: Time.now, freq: params[:freq]}
    end
    render :json => {counter: params[:counter], span_id: params[:span_id]}
  end

end