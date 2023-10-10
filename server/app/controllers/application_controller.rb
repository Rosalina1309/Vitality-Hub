class ApplicationController < ActionController::Base
  layout 'application'
  protect_from_forgery with: :exception

  def index

    render "layouts/application"
  end
end
