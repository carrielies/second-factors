Feature: Spacegov Helpdesk feature
  As a Spacegov Helpdesk user I want to be able to manage Space gov clients
  Lapse Larry already has an enrolment with Spacegov

  Background:
    Given I start on the Home Page

  Scenario: I try to log in with a user with no enrolments
    Given I log into spacegov truststore with email: "org@olive.com", password: "password"
    Then  I should be on the "Sorry, but you don't have access to Spacegov Helpdesk" page


  Scenario: Search the trust store for Lapse Larry
    Given I log into spacegov truststore with email: "helen@spacegov-help.com", password: "password"
    Then  I should be on the "Search for a user" page
    And   I enter: {email: "Lapse@larry.com"}
    And   I click "Search"
    Then  I should be on the "Lapse Larry SpaceCorp" page
    When  I click "Prove Identity"
    Then  I should be on the "Prove their identity" page
    When  I click "Go back to Spacegov Helpdesk"
    Then  I should be on the "Lapse Larry SpaceCorp" page