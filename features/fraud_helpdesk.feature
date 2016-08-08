Feature: Fraud Helpdesk feature
  As a Fraud Helpdesk user I want to be able to monitor accounts

  Background:
    Given I start on the Home Page

  Scenario: I try to log in with a user with no enrolments
    Given I log into fraud helpdesk with email: "org@olive.com", password: "password"
    And   I use Google authenticator
    Then  I should be on the "Sorry, but you don't have access to Fraud Helpdesk" page

  Scenario: Search the trust store for Lapse Larry, Suspend him then attempt to log in
    Given I search fraud helpdesk with email: "Patty@fraud.com", password: "password" for email: "lapse@larry.com"
    Then  I should be on the "Lapse Larry" page
    And   I should see content "Status Active"
    And   I should not see content "Account Suspended"
    And   I should not see content "Login with Suspended Account"
    When  I click "Suspend Account"
    And   I click "Sign out"
    When  I log into spacegov with email: "lapse@larry.com", password: "password"
    Then  I should see:
      | Your account has been suspended |
    When  I click "proposition-name"
    And   I search fraud helpdesk with email: "Patty@fraud.com", password: "password" for email: "lapse@larry.com"
    Then  I should be on the "Lapse Larry" page
    And   I should see:
      | Status Suspended |
      | Account Suspended |
      | Login with Suspended Account |
    When  I click "Clear Account"
    And   I click "Sign out"
    When  I log into spacegov with email: "lapse@larry.com", password: "password"
    Then  I should see:
      | Service trusts you to level 1 |
      | "status": "Active" |

  Scenario: Search the trust store for Lapse Larry, Flag him, then log into Spacegov
    Given I search fraud helpdesk with email: "Patty@fraud.com", password: "password" for email: "lapse@larry.com"
    Then  I should be on the "Lapse Larry" page
    And   I should see content "Status Active"
    And   I should not see content "Account Flagged"
    And   I should not see content "Login with Flagged Account"
    When  I click "Flag Account"
    And   I should see content "Account Flagged"
    And   I click "Sign out"
    When  I log into spacegov with email: "lapse@larry.com", password: "password"
    Then  I should see:
      | Service trusts you to level 1 |
      | "status": "Flagged" |
    When  I click "Sign out"
    And   I search fraud helpdesk with email: "Patty@fraud.com", password: "password" for email: "lapse@larry.com"
    Then  I should be on the "Lapse Larry" page
    And   I should see:
      | Status Flagged |
      | Account Flagged |
      | Login with Flagged Account |
