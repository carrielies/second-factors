
And /^I start on the Home Page$/ do
  visit "https://localhost:3000"
end

And /^I return to the Home Page$/ do
  click_link "proposition-name"
end

And /^I Sign out$/ do
  click_link "Sign out"
end

And /^I'm enroled onto Spacegov as (.*)$/ do |email|
  visit "https://localhost:3000"
  click_link "Spacegov"
  click_link "Sign into Spacegov"
  fill_in "email", with: email
  fill_in "password", with: "password"
  #
  click_link "Continue"
  click_link "Continue"
  fill_in "Your organisation name", with: "Zaltek"
  fill_in "Your mission statement", with: "To boldly go"
  click_link "Enrol for Spacegov"
  click_link "Continue"
end

Then /^I reset my spacegov password by entering my email: "(.*)"$/ do |email|
  reset_spacegov_password email
end

Then /^I should be on the "(.*)" page$/ do |page_header|
  expect(page).to have_content(page_header)
end

Then /^I'm on the "(.*)" page$/ do |page_header|
  expect(page).to have_content(page_header)
end


And /^I don't use two step verification$/ do
  choose("Don't use two step verification")
  click_link "Continue"
end

And /^I choose "(.*)"$/ do |choice|
  choose choice
end

And /^I use Google authenticator$/ do
  use_google_authenticator
end

And /^I enter: (.*)$/ do |data|

  d = eval(data)
  d.each do |name, val|
    fill_in name, with: val
  end
end


And /^I'm registering for Spacegov$/ do
  visit "https://localhost:3000"
  click_link "Spacegov"
  click_link "Sign into Spacegov"
  click_hint_link "Create a new account"
  click_link "Register a new account"
end

And /^I click hint link "(.*)"$/ do |link|
  click_hint_link link
end

def debug
  require 'pry'
  binding.pry
end


def click_hint_link name
  find("span", :text => Regexp.new(name)).click
end


And /^I wait$/ do
  sleep 1000
end

And /^I wait (.*) seconds$/ do |seconds|
  sleep seconds.to_i
end


When /^I sign in as (.*)$/ do |user_id|
  fill_in "userID", with: user_id
  fill_in "password", with: "anything"
  click_button "Sign in"
end

Then /^I should see the error:$/ do |table|
  table.raw.flatten.each { |r| expect(page).to have_content(r) }
end

And /^I should see the "(.*)" link$/ do |link|
  expect(page).to have_link( link )
end

And /^I should not see the "(.*)" link$/ do |link|
  expect(page).to have_no_link( link )
end

And /^I should still see the "(.*)" button$/ do |button_name|
  expect(page).to have_button( button_name )
end

And(/^I should not see the "(.*)" button$/) do |button_name|
  expect(page).to_not have_button( button_name )
end

And(/^the (.*) field should be empty$/) do |input_label|
  expect(page).to have_field( input_label, with: "")
end

Then /^I should see:$/ do |table|
  table.raw.flatten.each { |r| expect(page).to have_content(r) }
end

Then /^I should see content "(.*?)"$/ do |arg1|
   expect(page).to have_content(arg1)
end

Then /^I should not see content "(.*?)"$/ do |arg1|
   expect(page).to have_no_content(arg1)
end

When(/^I click the "(.*)" link$/) do |link|
  click_link link
end

And(/^I click "(.*)"$/) do |link|
  click_link link
end


And /^I have registered for spacegov with name: "(.*)", email: "(.*)", password: "(.*)"$/ do |name, email, password|
  register_for_spacegov email, name, password
end


And /^I log into spacegov truststore with email: "(.*)", password: "(.*)"$/ do |email,password|
  click_link "Helpdesk"
  click_link "Spacegov Helpdesk"
  click_link "Sign into Spacegov Helpdesk"
  fill_in "email", with: email
  fill_in "password", with: password
  click_link "Continue"
end

And /^I log into spacegov with email: "(.*)", password: "(.*)"$/ do |email,password|
  click_link "Spacegov"
  click_link "Sign into Spacegov"
  fill_in "email", with: email
  fill_in "password", with: password
  click_link "Continue"
end

And /^I attempt to log into spacegov with email: "(.*)", password: "(.*)"$/ do |email,password|
  click_link "Spacegov"
  click_link "Sign into Spacegov"
  fill_in "email", with: email
  fill_in "password", with: password
  click_link "Continue"
end

And /^I attempt to log into spacegov with new password for email: "(.*)"$/ do |email|
  click_link "Spacegov"
  click_link "Sign into Spacegov"
  fill_in "email", with: email
  fill_in "password", with: "monday12"
  click_link "Continue"
end

And /^I log into spacegov with email: "(.*)" and reset password$/ do |email|
  click_link "Spacegov"
  click_link "Sign into Spacegov"
  fill_in "email", with: email
  fill_in "password", with: @new_password
  click_link "Continue"
end

And /^I log into asteroidgov with email: "(.*)", password: "(.*)"$/ do |email,password|
  click_link "Asteroidgov"
  click_link "Sign into Asteroidgov"
  fill_in "email", with: email
  fill_in "password", with: password
  click_link "Continue"
end

And /^I log into fraud helpdesk with email: "(.*)", password: "(.*)"$/ do |email,password|
  click_link "Fraud"
  click_link "Fraud Helpdesk"
  click_link "Sign into Fraud Helpdesk"
  fill_in "email", with: email
  fill_in "password", with: password
  click_link "Continue"
end

And /^I search fraud helpdesk with email: "(.*)", password: "(.*)" for email: "(.*)"$/ do |email,password,findEmail|
  click_link "Fraud"
  click_link "Fraud Helpdesk"
  click_link "Sign into Fraud Helpdesk"
  fill_in "email", with: email
  fill_in "password", with: password
  click_link "Continue"
  use_google_authenticator
  fill_in "email", with: findEmail
  click_link "Search"
  click_link "Manage Account"
end

And /^I log into credential management using a second factor with email: "(.*)", password: "(.*)"$/ do |email,password|
  click_link "Credential Management"
  click_link "Sign into Credential Management"
  fill_in "email", with: email
  fill_in "password", with: password
  click_link "Continue"
  use_google_authenticator
end

And /^I log into credential management with email: "(.*)", password: "(.*)"$/ do |email,password|
  login_to_credential_management email,password
end

And /^I remove a second factor$/ do
  click_link "Remove Device Fingerprint"
  choose "Yes"
  click_link "Continue"
end

And /^I add a second factor$/ do
  click_link "Add additional second factor"
  choose "Device fingerprint"
  click_link "Continue"
  fill_in "deviceName", with: "Auto Test Device"
  click_link "Trust this device"
  choose "I'm done"
  click_link "Continue"
end

And /^I change my credential email to: "(.*)"$/ do |email|
  click_link "Change email"
  fill_in "email", with: email
  click_link "Continue"
  fill_in "code", with: "1234"
  click_link "Continue"
end

And /^I change my credential password to: "(.*)"$/ do |password|
  click_link "Change password"
  fill_in "old_password", with: "password"
  fill_in "password1", with: password
  fill_in "password2", with: password
  click_link "Continue"
end

And /^The credential level 2 trust should be broken$/ do
  account_trust_level_2 = eval(find("#credential-account").value)[:trust_id_level_2]
  response_trust_level_2 = eval(find("#gateway-response").value)[:trust_id_level_2]
  account_trust_level_2.should_not eq(response_trust_level_2)
end

And /^The credential level 2 trust should not be broken$/ do
  account_trust_level_2 = eval(find("#credential-account").value)[:trust_id_level_2]
  response_trust_level_2 = eval(find("#gateway-response").value)[:trust_id_level_2]
  account_trust_level_2.should eq(response_trust_level_2)
end

And /^The credential level 1 trust should be broken$/ do
  account_trust_level_1 = eval(find("#credential-account").value)[:trust_id]
  response_trust_level_1 = eval(find("#gateway-response").value)[:trust_id]
  account_trust_level_1.should_not eq(response_trust_level_1)
end

And /^The credential level 1 trust should not be broken$/ do
  account_trust_level_1 = eval(find("#credential-account").value)[:trust_id]
  response_trust_level_1 = eval(find("#gateway-response").value)[:trust_id]
  account_trust_level_1.should eq(response_trust_level_1)
end

And /^I log into organisation management with email: "(.*)", password: "(.*)"$/ do |email,password|
  login_to_credential_management email,password
  click_link "Manage Organisation"
  use_google_authenticator
end


And /^helpdesk agent searches for "(.*)"$/ do |email|
  search_helpdesk_for email
end

Given(/^spacegov helpdesk agent finds license: "([^"]*)"$/) do |license|
  fill_in "license", with: license
  click_link "Search for license"
  click_link "Prove Identity"
end

And /^helpdesk agent unable to prove identity and breaks level 1 trust$/ do
  click_hint_link "Customer unable to prove their identity"

  click_link "manage_account_and_break_trust"
  # manage account
  click_link "Reset password"
  # reset password
  @new_password = find(:css, '.password_box').text
  click_link "Continue"
  click_link "Sign out"
end

And /^helpdesk agent unable to prove identity and breaks level 2 trust$/ do
  click_hint_link "Customer unable to prove their identity"

  click_link "manage_account_and_break_trust"
  # manage account
  click_link "Remove Device Fingerprint"
  choose "Yes"
  click_link "Continue"
  click_link "Sign out"
end

Given(/^helpdesk agent proves identity and resets password$/) do
  # manage account
  click_link "Issue Challenge"
  populate_google_authenticator
  # manage account
  click_link "Reset password"
  # reset password
  @new_password = find(:css, '.password_box').text
  click_link "Continue"
  click_link "Sign out"
end

Given(/^spacegov helpdesk agent proves identity using swivel chair and resets password$/) do
  click_hint_link "I've proved their identity by other means"
  click_link "manage_account"
  # manage account
  click_link "Reset password"
  # reset password
  @new_password = find(:css, '.password_box').text
  click_link "Continue"
  click_link "Accept Trust for Spacegov Helpdesk"
  click_link "Sign out"
end

And /^I manage the user with email: "(.*)"$/ do |email|
    click_link "Manage-" + email
end

And /^I reset the assistants password of email: "(.*)"$/ do |email|
    click_link "Manage-" + email
    click_link "Reset password"
    click_link "Continue"
end

And /^I'm forced to reset my password: "(.*)"$/ do |password|
    fill_in "password1", with: password
    fill_in "password2", with: password
    click_link "Change password"
end

And /^I create an organisation user with name: "(.*)", email: "(.*)", type: "(.*)"$/ do |name,email,type|
    click_link "Create Account"
    fill_in "name", with: name
    fill_in "email", with: email
    choose type
    click_link "Continue"
    click_link "https://gg3.gov.uk/register/resume_registration"
    fill_in "password", with: "password"
    fill_in "password2", with: "password"
    click_link "Continue"
    use_google_authenticator
    choose "I'm done"
    click_link "Continue"
    # always ask for a second factor
    choose "Yes"
    click_link "Continue"
    click_link "Continue to Olive ltd"
    click_link "Credential Management"
end

def login_to_credential_management email, password
  click_link "Credential Management"
  click_link "Sign into Credential Management"
  fill_in "email", with: email
  fill_in "password", with: password
  click_link "Continue"
  choose "Don't use two step verification"
  click_link "Continue"
end


def register_for_spacegov email,name,password
  visit "https://localhost:3000"
  click_link "Spacegov"
  click_link "Sign into Spacegov"
  click_hint_link "Create a new account"
  click_link "Register a new account"
  # What's your name page
  fill_in "name", with: name
  click_link "Continue"
  # What is your email address
  fill_in "email", with: email
  fill_in "confirm_email", with: email
  click_link "Continue"
  #Confirm email code?
  fill_in "code", with: "1234"
  click_link "Continue"
  #Set your password
  fill_in "password", with: password
  fill_in "password2", with: password
  click_link "Continue"
  # Your authentication factors
  setup_google_authenticator
  choose "I'm done"
  click_link "Continue"
  # Always ask for a second authentication factor
  choose "No"
  click_link "Continue"
  # Your government gateway account has been created
  click_link "Continue to"
  # enrolment
  fill_in "org", with: "Zaltek"
  fill_in "mission", with: "To boldly go, where no man has gone before"
  click_link "Enrol for Spacegov"
  click_link "Continue"
  click_link "Sign out"
end

def setup_google_authenticator
  choose("Google authenticator")
  click_link "Continue"
  populate_google_authenticator
end

def use_google_authenticator
  choose("Google authenticator")
  click_link "Continue"
  populate_google_authenticator
end

def populate_google_authenticator

  code = find(:css, '.ga_code_hidden').text
  if code.is_a? Array
    code=code[0]
  end

  fill_in "code", with: code
  click_link "Continue"
end

def search_helpdesk_for email
  click_link "Helpdesk"
  click_link "Spacegov Helpdesk"
  click_link "Sign into Spacegov Helpdesk"
  # sign in
  fill_in "email", with: "helen@spacegov-help.com"
  fill_in "password", with: "password"
  click_link "Continue"
  # two step verification
  # click_link "Continue"
  # Welcome back
  click_link "Search by email and name"
  # Search for user
  fill_in "email", with: email
  click_link "Search"
  # results
  click_link "Prove Identity"
end

def reset_spacegov_password email
  click_link "Spacegov"
  click_link "Sign into Spacegov"
  click_hint_link "Forgotten your password"
  click_link "Recover your password"
  # Recover password from Government Gateway account
  fill_in "email", with: email
  click_link "Reset password"
  # Reset password
  click_link "resetpassword"
  # Two step verification?
end

And(/^I debug$/) do
  require 'pry'
  binding.pry
end

And(/^I take a screenshot: "(.*)"$/) do |file_name|
  if ENV['screenshots'] == "true"
    save_screenshot(file_name, full: true)
  end
end

And(/^I key in the google authenticator code$/) do
  code = find(:css, '.ga_code_hidden').text
  if code.is_a? Array
    code=code[0]
  end

  fill_in "code", with: code
end