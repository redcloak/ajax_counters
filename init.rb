require 'application_helper'

Redmine::Plugin.register :ajax_counters do
  name 'AjaxCounters plugin'
  author 'Danil Kukhlevskiy, Vladimir Pitin'
  description 'This is a plugin for Redmine improving counters'
  version '0.0.1'
  url 'http://rmplus.pro/'
  author_url 'http://rmplus.pro/'

  # settings :default => {:custom_help_url => ''},
  #          :partial => 'settings/ajax_counters'

end

Rails.application.config.to_prepare do
  ApplicationHelper.send(:include, AjaxCounters::ApplicationHelperPatch)
  User.send(:include, AjaxCounters::UserPatch)
end

require 'ajax_counters/view_hooks'