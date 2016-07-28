Feature: Spacegov feature
  As a user of Spacegov I want to authenticate via government gateway

Scenario: Level 1
  Given I'm enroled onto Spacegov as average@joe.com
  Then I should see:
   | Service trusts you to level 1 |
  When I click "Apply for a grant to clean"
  Then I should be on the "Two step verification" page
  And I don't use two step verification
  Then I should see:
    |As you were unable to authenticate with a second factor, you will need to visit your local Spacegov office.|

Scenario: Level 2
  Given I'm enroled onto Spacegov as average@joe.com
  When I click "Apply for a grant to clean"
  Then I should be on the "Two step verification" page
  And I use Google authenticator
  Then I should be on the "Apply for cleaning grant" page