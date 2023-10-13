require 'active_record'

# Initialize the ActiveRecord connection to your PostgreSQL database
ActiveRecord::Base.establish_connection(
  adapter: postgresql
  encoding: unicode
  database: <%= ENV['DATABASE'] %>
  pool: 5
  username: <%= ENV['DB_USER'] %>
  password: <%= ENV['DB_PASSWORD'] %>
  host: <%= ENV['DB_HOST'] %>
  port: 5432
)

begin
  connection = ActiveRecord::Base.connection
  if connection.active?
    puts 'PostgreSQL connection is active.'
  else
    puts 'PostgreSQL connection is not active.'
  end
rescue ActiveRecord::NoDatabaseError => e
  puts "PostgreSQL database doesn't exist: #{e.message}"
rescue ActiveRecord::ConnectionNotEstablished => e
  puts "Unable to connect to PostgreSQL database: #{e.message}"
end
