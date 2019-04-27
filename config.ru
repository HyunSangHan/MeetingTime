require 'sinatra'
require 'sinatra/activerecord'
require './controller.rb'
require 'rack/cors'
require './function.rb'
require './db_class.rb'

use Rack::Cors do
    allow do
        origins '*'
        resource '*', headers: :any, methods: [:get, :post, :options]
    end
end

run Sinatra::Application