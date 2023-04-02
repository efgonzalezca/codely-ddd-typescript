Feature: Obtain the total number of users
  In order to have a users counter
  As a user
  I want to see the users counter

  Scenario: With one user
    Given I send an event to the event bus:
    """
    {
      "data": {
        "id": "07e845a9-3241-4dc7-8887-0426f10b9857",
        "type": "user.created",
        "occurred_on": "2023-03-30T08:37:32+00:00",
        "aggregateId": "8c900b20-e04a-4777-9183-32faab6d2fb5",
        "attributes": {
          "names": "Efraín",
          "surnames": "González",
          "document": "1053850398"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """
    When I send a GET request to "/usersCounter"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "total": 1
    }
    """

  Scenario: With more than one course having duplicates
    Given I send an event to the event bus:
    """
    {
      "data": {
        "id": "07e845a9-3241-4dc7-8887-0426f10b9857",
        "type": "user.created",
        "occurred_on": "2023-03-30T08:37:32+00:00",
        "aggregateId": "8c900b20-e04a-4777-9183-32faab6d2fb5",
        "attributes": {
          "names": "Efraín",
          "surnames": "González",
          "document": "1053850398"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """
    And I send an event to the event bus:
    """
    {
      "data": {
        "id": "8c4a4ed8-9458-489e-a167-b099d81fa096",
        "type": "user.created",
        "occurred_on": "2023-03-30T08:37:32+00:00",
        "aggregateId": "8c4a4ed8-9458-489e-a167-b099d81fa096",
        "attributes": {
          "names": "Mateo",
          "surnames":"Carvajal Garcia",
          "document": "1053845913"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """
    And I send an event to the event bus:
    """
    {
      "data": {
        "id": "8c4a4ed8-9458-489e-a167-b099d81fa096",
        "type": "user.created",
        "occurred_on": "2019-08-09T08:36:32+00:00",
        "aggregateId": "07e845a9-3241-4dc7-8887-0426f10b9857",
        "attributes": {
          "names": "Mateo",
          "surnames":"Carvajal Garcia",
          "document": "1053845913"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """
    When I send a GET request to "/coursesCounter"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "total": 2
    }
    """