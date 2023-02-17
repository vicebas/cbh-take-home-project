# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Tickets

> **Create the custom ID Field**
>   Create a migration that creates the custom ID Field. It should be a string field and suport until 40 characters. As a identifier, it has be unique, and has to be indexed. As a index, it cant be empty, so fill this new field on the already present data  with the database ID on the migration.
> Update the models with this information, and the create and update forms of the agent
>
> Estimated Time: 4h
>
>Acceptance Criteria:  
> - A new field should be created on the database, and the new index too
> - The manager should be able to set a custom Id for the agent

> **Update `getShiftsByFacility` to add the custom Id on the metadata**
>  Update the return of the `getShiftsByFacility` method to return the customId field on the report. It also should keep return the database Id, now under the alias of internal id
>
> Estimated Time: 2h
>
> Acceptance Criteria: 
> - The `getShiftsByFacility` method now includes the customId on the agent metadata
> - The `generateReport` is still able to generate the report with this update.

> **Add the `customId` filter to the `generateReport`method.**
> Update the `generateReport`method, replacing the internal id with the custom id on the report. Hide the internal id, and generate the report with custom id on it place. 
> 
> Estimated Time: 2h
> 
> Acceptance Criteria: 
> - The `generateReport` method now generates a report with the customId on the id slot
> 

