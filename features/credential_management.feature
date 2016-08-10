Feature: Credential Management feature
  As a user I want to be able to manage my own credentials

  Background:
    Given I start on the Home Page

  Scenario: Convert to be an Organisation when I have a 2FA
    Given I log into credential management with email: "average@joe.com", password: "password"
    And   I click "Convert to Organisation"
    And   I enter: {org_name: "Joe ltd"}
    When  I click "Continue"
    And   I click "Manage Organisation"
    And   I use Google authenticator
    Then   I should see:
      | Joe ltd |
      | Your linked accounts |

  Scenario: Convert to be an Organisation when I have a 1FA
    Given I log into credential management with email: "lapse@larry.com", password: "password"
    And   I click "Convert to Organisation"
    And   I enter: {org_name: "Larry ltd"}
    When  I click "Continue"
    And   I click "Manage Organisation"
    Then  I should be on the "You don't have a second factor set up" page


  Scenario: I want to be able to change my password
    Given I log into credential management with email: "lapse@larry.com", password: "password"
    And   I click "Change password"
    When  I enter: {old_password: "password", password1: "new_password", password2: "new_password"}
    And   I click "Continue"
    And   I click "Sign out"
    When  I log into credential management with email: "lapse@larry.com", password: "new_password"
    Then  I should be on the "Credential Management" page


  Scenario: I want to able delete my account
    Given I log into credential management with email: "lapse@larry.com", password: "password"
    And   I click "Delete account"
    And   I choose "Yes"
    And   I click "Continue"
    Then  I should be on the "Account has been deleted" page
    When  I return to the Home Page
    And   I attempt to log into spacegov with email: "lapse@larry.com", password: "password"
    Then  I should be on the "Invalid email/password" page
