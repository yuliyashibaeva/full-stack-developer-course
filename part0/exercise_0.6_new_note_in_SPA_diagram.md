# New note in Single page app diagram

Create a diagram depicting the situation where the user creates a new note using the single-page version of the app: https://studies.cs.helsinki.fi/exampleapp/spa.

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: Request body: {"content":"test comment spa","date":"2025-04-26T09:43:48.975Z"}

    server-->>browser: HTTP 201 Created
    deactivate server
    Note left of server: Response: {"message":"note created"}
```