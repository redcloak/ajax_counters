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

  menu :custom_menu, :ac_update_counters, '#', caption: Proc.new {('<span>'+I18n.t(:label_refresh_ajax_counters)+'</span>').html_safe}, if: Proc.new { true }, html: {class: 'in_link ac_refresh', id: 'refresh_ajax_counters'}

end

Rails.application.config.to_prepare do
  ApplicationHelper.send(:include, AjaxCounters::ApplicationHelperPatch)
  ApplicationController.send(:include, AjaxCounters::ApplicationControllerPatch)
  User.send(:include, AjaxCounters::UserPatch)
end

require 'ajax_counters/view_hooks'