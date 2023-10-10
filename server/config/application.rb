# require 'dotenv/rails-now'
require 'active_storage/engine'
require 'action_mailer/railtie'


module Server
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    config.generators do |g|
      g.template_engine :erb
      g.layout "application" # Set to the name of your custom layout file without the .html.erb extension
    end

    # To load the env file
    Bundler.require(*Rails.groups)
    # Dotenv::Railtie.load

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w(assets tasks))

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
