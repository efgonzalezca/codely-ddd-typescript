Feature: Create a new user
  In order to access to application
  As a user with admin permissions
  I want to create a new user

  Scenario: A valid non existing user
    Given I send a PUT request to "/users/07e845a9-3241-4dc7-8887-0426f10b9857" with body:
    """
    {
      "id": "07e845a9-3241-4dc7-8887-0426f10b9857",
      "names": "Efraín",
      "surnames": "González",
      "document": "1053850398"
    }
    """
    Then the response status code should be 201
    And the response should be empty

  Scenario: An invalid non existing user
    Given I send a PUT request to "/users/07e845a9-3241-4dc7-8887-0426f10b9857" with body:
    """
    {
      "id": "07e845a9-3241-4dc7-8887-0426f10b9857",
      "names": "Efraín",
      "surnames": "González",
      "document": 1053850398
    }
    """
    Then the response status code should be 422