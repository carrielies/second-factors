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

  Scenario: I want to able delete my account
    Given I log into credential management with email: "lapse@larry.com", password: "password"
    And   I click "Delete account"
    And   I choose "Yes"
    And   I click "Continue"
    Then  I should be on the "Account has been deleted" page
    When  I return to the Home Page
    And   I attempt to log into spacegov with email: "lapse@larry.com", password: "password"
    Then  I should be on the "Invalid email/password" page


  Scenario: I want to be able to change my password when I don't have a second factor and not break my trust
    Given I log into credential management with email: "average@joe.com", password: "password"
    And   I click "Change password"
    When  I enter: {old_password: "password", password1: "new_password", password2: "new_password"}
    And   I click "Continue"
    And   I click "Sign out"
    When  I log into credential management with email: "average@joe.com", password: "new_password"
    Then  I should be on the "Credential Management" page
    Then  The credential level 2 trust should not be broken
    And   The credential level 1 trust should not be broken

  Scenario: I want to be able to change my password when I do have a second factor and not break my trust
    Given I log into credential management using a second factor with email: "average@joe.com", password: "password"
    And   I click "Change password"
    When  I enter: {old_password: "password", password1: "new_password", password2: "new_password"}
    And   I click "Continue"
    And   I click "Sign out"
    When  I log into credential management with email: "average@joe.com", password: "new_password"
    Then  I should be on the "Credential Management" page
    Then  The credential level 2 trust should not be broken
    And   The credential level 1 trust should not be broken

  Scenario: I want to remove a second factor when not logged in with a second factor and break my trust
    Given I log into credential management with email: "average@joe.com", password: "password"
    And   I remove a second factor
    Then  The credential level 2 trust should be broken
    And   The credential level 1 trust should not be broken


  Scenario: I want to add a second factor when not logged in with a second factor and break my trust
    Given I log into credential management with email: "lapse@larry.com", password: "password"
    And   I add a second factor
    Then  The credential level 2 trust should be broken
    And   The credential level 1 trust should not be broken

  Scenario: I want to manage my second factors when logged in with a second factor and not break my trust
    Given I log into credential management using a second factor with email: "average@joe.com", password: "password"
    And   I remove a second factor
    And   I add a second factor
    Then  The credential level 2 trust should not be broken
    And   The credential level 1 trust should not be broken


  Scenario: Users removes a 2FA as level 1 and breaks level 2 trust
    Given I log into credential management with email: "average@joe.com", password: "password"
    And   I remove a second factor
    And   I Sign out
    When  I log into spacegov with email: "average@joe.com", password: "password"
    Then  I should see:
      | Service trusts you to level 1 |
    When  I click "Apply for a grant to create a new station"
    And   I use Google authenticator
    Then  I should see:
      | We need to check that it really is you. |
    And   I Sign out
    And   I log into asteroidgov with email: "average@joe.com", password: "password"
    Then  I should see:
      | We trust you to level 1 |

  Scenario: Users removes a 2FA as level 2 and doesn't break trust
    Given I log into credential management using a second factor with email: "average@joe.com", password: "password"
    And   I remove a second factor
    And   I Sign out
    When  I log into spacegov with email: "average@joe.com", password: "password"
    Then  I should see:
      | Service trusts you to level 1 |
    When  I click "Apply for a grant to create a new station"
    And   I use Google authenticator
    Then  I should see:
      | Apply for station grant We need some details about your space station. |
    And   I Sign out
    And   I log into asteroidgov with email: "average@joe.com", password: "password"
    Then  I should see:
      | We trust you to level 1 |
