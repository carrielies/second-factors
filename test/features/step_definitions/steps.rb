
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
  choose("Google authenticator")
  click_link "Continue"

  code = find(:css, '.form-hint').text
  if code.is_a? Array
    code=code[0]
  end

  fill_in "code", with: code
  click_link "Continue"
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

def click_hint_link name
  find("span", :text => Regexp.new(name)).click
end


And /^I wait$/ do
  sleep 1000
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

When(/^I click the "(.*)" link$/) do |link|
  click_link link
end

And(/^I click "(.*)"$/) do |link|
  click_link link
end


And /^I have registered for spacegov with name: "(.*)", email: "(.*)", password: "(.*)"$/ do |name, email, password|
  register_for_spacegov email, name, password
end


And /^I log into spacegov with email: "(.*)", password: "(.*)"$/ do |email,password|
  click_link "Spacegov"
  click_link "Sign into Spacegov"
  fill_in "email", with: email
  fill_in "password", with: password
  click_link "Continue"
end

And /^I log into spacegov with email: "(.*)" and reset password$/ do |email|
  click_link "Spacegov"
  click_link "Sign into Spacegov"
  fill_in "email", with: email
  fill_in "password", with: @new_password
  click_link "Continue"
end


And /^helpdesk agent searches for "(.*)"$/ do |email|
  search_helpdesk_for email
end

And /^helpdesk agent unable to prove identity and breaks trust$/ do
  click_hint_link "Customer unable to prove their identity"

  click_link "manage_account_and_break_trust"
  # manage account
  click_link "Reset password"
  # reset password
  @new_password = find(:css, '.password_box').text
  click_link "Continue"
  click_link "Save changes and break trust"
  click_link "Sign out"
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
  # Your government gateway account has been created
  click_link "Save and Sign in"
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

  code = find(:css, '.form-hint').text
  if code.is_a? Array
    code=code[0]
  end

  fill_in "code", with: code
  click_link "Continue"
end


def search_helpdesk_for email
  click_link "Helpdesk"
  click_link "Sign into Helpdesk"
  # sign in
  fill_in "email", with: "average@joe.com"
  fill_in "password", with: "password"
  click_link "Continue"
  # two step verification
  # click_link "Continue"
  # Welcome back
  click_link "Search"
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