Feature: Fraud Helpdesk feature
  As a Fraud Helpdesk user I want to be able to monitor accounts

  Background:
    Given I start on the Home Page

  Scenario: I try to log in with a user with no enrolments
    Given I log into fraud helpdesk with email: "org@olive.com", password: "password"
    And   I use Google authenticator
    Then  I should be on the "Sorry, but you don't have access to Fraud Helpdesk" page

  Scenario: Search the trust store for Lapse Larry and change his status
    Given I log into fraud helpdesk with email: "Patty@fraud.com", password: "password"
    And   I use Google authenticator
    Then  I should be on the "Search for a user" page
    And   I enter: {email: "Lapse@larry.com"}
    And   I click "Search"
    When  I click "Manage Account"
    Then  I should be on the "Lapse Larry" page
    And   I should see content "Active"
    And   I should not see content "Account Suspended"
    And   I should not see content "Account Flagged"
    And   I should not see content "Account Cleared"
    When  I click "Suspend Account"
    And   I should see content "Suspended"
    And   I should see content "Account Suspended"
    When  I click "Flag Account"
    Then  I should see content "Flagged"
    And   I should see content "Account Suspended"
    And   I should see content "Account Flagged"
    When  I click "Clear Account"
    Then  I should see content "Active"
    And   I should see content "Account Suspended"
    And   I should see content "Account Flagged"
    And   I should see content "Account Cleared"

  Scenario: Search the trust store for Lapse Larry, Suspend him then attempt to log in
    Given I log into fraud helpdesk with email: "Patty@fraud.com", password: "password"
    And   I use Google authenticator
    Then  I should be on the "Search for a user" page
    And   I enter: {email: "lapse@larry.com"}
    And   I click "Search"
    When  I click "Manage Account"
    Then  I should be on the "Lapse Larry" page
    And   I should see content "Active"
    When  I click "Suspend Account"
    And   I click "Sign out"
    When  I log into spacegov with email: "lapse@larry.com", password: "password"
    Then  I should see:
      | Service trusts you to level 1 |

  Scenario: Search the trust store for Lapse Larry, Flag him, then log into Spacegov
    Given I log into fraud helpdesk with email: "Patty@fraud.com", password: "password"
    And   I use Google authenticator
    Then  I should be on the "Search for a user" page
    And   I enter: {email: "lapse@larry.com"}
    And   I click "Search"
    When  I click "Manage Account"
    Then  I should be on the "Lapse Larry" page
    And   I should see content "Active"
    And   I should not see content "Account Flagged"
    When  I click "Flag Account"
    And   I should see content "Account Flagged"
    And   I click "Sign out"
    When  I log into spacegov with email: "lapse@larry.com", password: "password"
    Then  I should see:
      | Service trusts you to level 1 |
