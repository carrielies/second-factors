require 'capybara'
require 'capybara/cucumber'
require 'capybara/rspec'
require 'mirage/client'
require 'capybara/poltergeist'
require 'phantomjs'

if ENV['browser'] == "phantom"

  Capybara.register_driver :poltergeist do |app|
        options = {
                  js_errors: false, # silences js errors
                  timeout: 500, # adjusts timeout in ms
                  }
      Capybara::Poltergeist::Driver.new(app, options)
    end

  Capybara.default_driver = :poltergeist

else

  Capybara.register_driver :selenium do |app|
   Capybara::Selenium::Driver.new(app, :browser => :chrome)
  end
  Capybara.default_driver = :selenium
end


