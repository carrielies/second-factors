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
    Then  spacegov helpdesk agent finds license: "SP651C02E4"
    Then  I should be on the "Prove their identity" page
    When  I click "Back"
    Then  I should be on the "Lapse Larry SpaceCorp" page

  Scenario: Spacegov agents Resets the password of Lapse Larry proving identity via swivel chair. Trusted in Spacegov, not in Asteroidgov
    Given I log into spacegov truststore with email: "helen@spacegov-help.com", password: "password"
    And   spacegov helpdesk agent finds license: "SP651C02E4"
    And   spacegov helpdesk agent proves identity using swivel chair and resets password
    And   I log into spacegov with email: "lapse@larry.com" and reset password
    And   I'm forced to reset my password: "newpassword"
    And   I should be on the "Service trusts you to level 1" page
    And   I Sign out
    And   I log into asteroidgov with email: "lapse@larry.com", password: "newpassword"
    And   I should be on the "We trust you to level 1" page