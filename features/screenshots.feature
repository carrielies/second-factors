@smartphone
Feature: Screenshots
  As the a product owner, I want to see some screenshots of the journeys

  Background:
    Given I start on the Home Page
  
  Scenario: Sign in
    And I click "Spacegov"
    And I take a screenshot: "docs/screenshots/sign_in/spacegov_landing_page.png"
    And I click "Sign into Spacegov"
    And I enter: {email: "security@simon.com", password: "password"}
    And I take a screenshot: "docs/screenshots/sign_in/sign_in.png"
    And I click "Continue"
    And I choose "Google authenticator"
    And I wait 1 seconds
    And I take a screenshot: "docs/screenshots/sign_in/your_auth_factors.png"
    And I click "Continue"
    And I key in the google authenticator code
    And I take a screenshot: "docs/screenshots/sign_in/google_authenticator.png"
    And I click "Continue"
    And I enter: {"Your station name": "Elite", "Your mission statement": "To boldly go, where no man has gone before" }
    And I take a screenshot: "docs/screenshots/sign_in/enroll.png"








