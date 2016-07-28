require 'capybara'
require 'capybara/cucumber'
require 'capybara/rspec'
require 'mirage/client'

Mirage.start
Capybara.register_driver :selenium do |app|
 Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Capybara.default_driver = :selenium

After do
  Mirage.stop
  Capybara.current_session.driver.quit
end