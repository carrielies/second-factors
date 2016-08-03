Feature: Organisation feature
  As the owner of an Organisation, I want to be able to create my origanisation within Government Gateway.
  I also want to be able to manage other users within this organisation


  Scenario: Create a new account and convert to be an Organisation
    Given I log into credential management with email: "lapse@larry.com", password: "password"
    And   I click "Convert to Organisation"
    And   I enter: {org_name: "Larry ltd"}
    When  I click "Continue"
    And   I click "Manage Organisation"
    Then  I should be on the "Larry ltd" page

  Scenario: Login as an Organisation and create a new Administrator and change olive to be an Assistant
    Given I log into organisation management with email: "org@olive.com", password: "password"
    Then  I should be on the "Olive ltd" page
    And   I create an organisation user with name: "Alan Admin", email: "alan@olive.com", type: "Administrator"
    And   I click "Manage Organisation"
    Then  I should be on the "Olive ltd" page
    When  I click "Manage Account"
    Then  I should be on the "Organised Olive" page
    When  I click "Convert to assistant"
    And   I click "Sign out"
    And   I return to credential management with email: "org@olive.com", password: "password"
    Then  I should be on the "Assistant" page

  Scenario: Login as an Organisation and create a new Administrator and delete olive
    Given I log into organisation management with email: "org@olive.com", password: "password"
    Then  I should be on the "Olive ltd" page
    And   I create an organisation user with name: "Alan Admin", email: "alan@olive.com", type: "Administrator"
    And   I click "Manage Organisation"
    Then  I should be on the "Olive ltd" page
    When  I click "Manage Account"
    Then  I should be on the "Organised Olive" page
    And   I wait
    When  I click "Delete account"
    And   I choose "Yes"
    And   I click "Continue"
    Then  I should be on the "Organised Olive" page