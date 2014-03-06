require 'application_helper'

module AjaxCounters
  module ApplicationHelperPatch
    def self.included(base)
      base.extend(ClassMethods)

      base.send(:include, InstanceMethods)

      # Same as typing in the class
      base.class_eval do
      end

    end

    module ClassMethods
    end

    module InstanceMethods

      def ajax_counter(url, options={refresh_frequency: 180})
        User.current.ajax_counter(url, options)
      end

    end
  end
end
