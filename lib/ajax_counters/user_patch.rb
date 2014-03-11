require_dependency 'principal'
require_dependency 'user'

module AjaxCounters
  module UserPatch
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
        options[:css] = options[:css] ? 'ac_counter '+options[:css].to_s : 'ac_counter'
        options[:period] = options[:period] ? options[:period].to_i : 180
        url_md5 = Digest::MD5.hexdigest(url)
        '<span data-id="'+url_md5+'" class="'+options[:css]+'" data-url="'+url+'" data-period="'+options[:period].to_s+'"></span>'.html_safe
      end
    end

  end
end