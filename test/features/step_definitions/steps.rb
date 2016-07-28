
And /^I'm enroled onto Spacegov as (.*)$/ do |email|
  visit "https://localhost:3000"
  click_link "Spacegov"
  click_link "Sign into Spacegov"
  fill_in "email", with: email
  fill_in "password", with: "password"
  click_link "Continue"
  click_link "Continue"
  fill_in "Your organisation name", with: "Zaltek"
  fill_in "Your mission statement", with: "To boldly go"
  click_link "Enrol for Spacegov"
  click_link "Continue"
end

Then /^I should be on the "(.*)" page$/ do |page_header|
  expect(page).to have_content(page_header)
end

And /^I don't use two step verification$/ do
  choose("Don't use two step verification")
  click_link "Continue"
end

And /^I use Google authenticator$/ do
  choose("Google authenticator")
  click_link "Continue"
  code = find(:css, '.form-hint').text
  fill_in "code", with: code[0]
  click_link "Continue"
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
