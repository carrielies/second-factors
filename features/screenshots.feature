Feature: Screenshots
  As the a product owner, I want to see some screenshots of the journeys

  Background:
    Given I start on the Home Page
  
  Scenario: Registration
    And I click "Spacegov"
    And I take a screenshot: "docs/screenshots/spacegov_landing_page.png"
    And I click "Sign into Spacegov"
    And I enter: {email: "security@simon.com", password: "password"}
    And I take a screenshot: "docs/screenshots/sign_in.png"
    And I click "Continue"
    And I take a screenshot: "docs/screenshots/your_auth_factors.png"
    And I choose "Google authenticator"
    And I click "Continue"
    And I take a screenshot: "docs/screenshots/google_authenticator.png"






