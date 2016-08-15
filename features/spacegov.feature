Feature: Trust and security level feature
  As the owner of Spacegov, I want users to be able to authenticate to different levels
  and I want to be told when I need to retrust them.


  Background:
    Given I start on the Home Page

  Scenario: I can register a new account
    Given I have registered for spacegov with name: "Mark Middleton", email: "markymiddleton@gmail.com", password: "password"

  Scenario: Reset Password and breaking trust
    When I reset my spacegov password by entering my email: "average@joe.com"
    And I should be on the "Two step verification" page
    And I choose "Don't use two step verification"
    And I click "Continue"
    And I enter: {password: "newpassword", password2: "newpassword"}
    When I click "Reset password"
    Then I should be on the "We need to check that it really is you." page


  Scenario: Reset Password and do not break trust
    When I reset my spacegov password by entering my email: "average@joe.com"
    And I should be on the "Two step verification" page
    And I use Google authenticator
    And I enter: {password: "newpassword", password2: "newpassword"}
    When I click "Reset password"
    Then I should be on the "What would you like to do?" page
    And I should see:
      | Service trusts you to level 2 |

  Scenario: Reset Password and not breaking trust
    When I reset my spacegov password by entering my email: "average@joe.com"
    And I'm on the "Two step verification" page
    And I choose "Don't use two step verification"
    And I click "Continue"
    And I enter: {password: "newpassword", password2: "newpassword"}
    When I click "Reset password"
    Then I should be on the "We need to check that it really is you." page


  Scenario: Level 1 and Level 2 trust
    When I log into spacegov with email: "average@joe.com", password: "password"
    Then I should see:
      | Service trusts you to level 1 |
    And I click "Apply for a grant to clean"
    And I should see:
      | Spacegov would like you to use a second authentication factor |
    And I don't use two step verification
    Then I should see:
      |As you were unable to authenticate with a second factor, you will need to visit your local Spacegov office.|
    And I click "Continue"
    Then I should see:
      | Service trusts you to level 1 |
    When I click "Apply for a grant to clean"
    And I use Google authenticator
    Then I should be on the "Apply for cleaning grant" page
    And I click "Apply"
    Then I should be on the "Grant appliction submitted" page
    And I click "Continue"
    Then I should see:
      | Service trusts you to level 2 |





