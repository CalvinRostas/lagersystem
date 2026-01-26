# Sprint
Weekly sprint
"executable" result after Sprint was finished and issues were tested
Test phase can last up to one week after the previous sprint was finished. The test phase will then overlap with the next implementation sprint
If all issues were tested, the sprint software revision might be released.

# Issues
**Issue**
Any new software feature based on a software requirement
🔥 Always Use the "issue" template
Issue labeled with "other" will not be included in software change history, e.g.: evaluations etc.
🔥 Always Use the "other" template

**Incident**
Bug or incident found in any software release (customer release or sprint release)
Always use the "incident" template

**Tasks**
🔥 DO NOT USE THIS! as a regular ticket. Maybe used as underlying task description. Will !NOT! be exported to the software revision history.

**Issue workflow**
- New issue (unassigned), should always be assigned to the milestone "Backlog"
- State open - Issue is assigned to a developer and is worked at
    - Any issue must be assigned to a milestone (at least to the milestone "Backlog")
    - Any issue must be assigned to a responsible person, as soon as assigned to a sprint
    - The responsible person should estimate the effort and set the estimated time filed value
    - The responsible person might/should document the time worked on the item (time spent field)
- Label "READY_4_test"
    - Issue is implemented and ready to be tested. The issue should then be assigned to a tester.
- State close
    - Issue is fully implemented AND tested (definition of done)

# Sprint planning session
- At the beginning of a sprint
- Assign issues
    - From the backlog to a Sprint
    - Prioritize the issue
    - Assign to a responsible person for implementation
    - The responsible person should estimate the time needed

# Sprint closure in next sprint planing session
- Are all issues labeled Ready_4_Test or even "closed"
    - Assign to a tester if not tested yet
    - Set milestone for end of test and release generation
    - Assign unfinished issues to the next sprint or to the "Backlog"