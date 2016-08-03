require 'capybara'
require 'capybara/cucumber'
require 'capybara/rspec'
require 'mirage/client'

Capybara.register_driver :selenium do |app|
 Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Capybara.default_driver = :selenium
