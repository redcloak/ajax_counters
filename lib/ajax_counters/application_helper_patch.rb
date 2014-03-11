require 'application_helper'

module AjaxCounters
  module ApplicationHelperPatch
    def self.included(base)
      base.extend(ClassMethods)

      base.send(:include, InstanceMethods)

      base.class_eval do
      end

    end

    module ClassMethods
    end

    module InstanceMethods

      def ajax_counter(url, options={})
        User.current.ajax_counter(url, options).html_safe
      end

    end
  end
end
