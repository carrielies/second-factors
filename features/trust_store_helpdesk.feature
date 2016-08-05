Feature: Trust Store Helpdesk feature
  As a Spacegov trust store Helpdesk user I want to be able to manage Space gov clients
  Lapse Larry already has an enrolment with Spacegov

  Background:
    Given I start on the Home Page

  Scenario: I try to log in with a user with no enrolments
    Given I log into spacegov truststore with email: "org@olive.com", password: "password"
    Then  I should be on the "Sorry, but you don't have access to Spacegov Trust Store Helpdesk" page


  Scenario: Search the trust store for Lapse Larry
    Given I log into spacegov truststore with email: "helen@spacegov-help.com", password: "password"
    Then  I should be on the "What would you like to do?" page
    When  I click "Search for User"
    And   I enter: {email: "Lapse@larry.com"}
    And   I click "Search"
    Then  I should be on the "Lapse Larry SpaceCorp" page
    When  I click "Helpdesk"
    Then  I should be on the "Prove their identity" page
    When  I click "Go back to Spacegov Trust Store"
    Then  I should be on the "Lapse Larry SpaceCorp" page