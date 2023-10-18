Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*',
      headers:  ['Authorization', 'Content-Type', 'X-CSRF-Token'],
      methods: [:post]
  end
end
