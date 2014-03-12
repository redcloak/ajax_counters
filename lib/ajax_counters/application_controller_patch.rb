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
        # save to session only if periond > 0
        if params[:counter_id].is_a?(String) && params[:period].to_i > 0
          session[params[:counter_id]] = {c: count.to_i, t: Time.now, p: params[:period].to_i}
        end
        render :json => {counter: count, counter_id: params[:counter_id], counter_stored: true}
      end

    end
  end
end
