module AjaxCounters
  module ApplicationControllerPatch
    def self.included(base)
      base.extend(ClassMethods)

      base.send(:include, InstanceMethods)

      base.class_eval do
      end

    end

    module ClassMethods
    end

    module InstanceMethods

      private
      def ajax_counter_respond(count)
        session[params[:counter_id]] = {count: count.to_i, time: Time.now, period: params[:period].to_i}
        render :json => {counter: count, counter_id: params[:counter_id], counter_stored: true}
      end

    end
  end
end
