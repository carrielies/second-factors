Feature: Fraud Helpdesk feature
  As a Fraud Helpdesk user I want to be able to monitor accounts

  Background:
    Given I start on the Home Page

  Scenario: I try to log in with a user with no enrolments
    Given I log into fraud helpdesk with email: "org@olive.com", password: "password"
    And   I use Google authenticator
    Then  I should be on the "Sorry, but you don't have access to Fraud Helpdesk" page


  Scenario: Search the trust store for Lapse Larry
    Given I log into fraud helpdesk with email: "Patty@fraud.com", password: "password"
    And   I use Google authenticator
    Then  I should be on the "Search for a user" page
    And   I enter: {email: "Lapse@larry.com"}
    And   I click "Search"
    When  I click "Manage Account"
    Then  I should be on the "Lapse Larry" page