# GraphiQL Playground

![GraphiQL Playground](/public/screenshot.png)

Welcome to the GraphiQL Playground repository! This project is a web-based interactive GraphQL IDE, allowing you to explore and test your GraphQL APIs. It provides an intuitive interface for querying, exploring schemas, and inspecting responses, making it easier for developers to work with GraphQL.

## Deployment

[GraphiQL Playground](https://graphiql-app.netlify.app/)


## Realized Features

- **Query Execution**: Execute GraphQL queries against your API and visualize the responses in a user-friendly manner.
- **Schema Exploration**: Explore and navigate through the GraphQL schema of your API, including types, fields, and relationships. Gain insights into the available operations and their input/output requirements.
- **Autocomplete**: Enjoy the convenience of intelligent autocomplete suggestions while typing GraphQL queries, reducing errors and enhancing productivity.
- **Response Analysis**: Inspect and analyze the structure and content of GraphQL responses.
- **Variables**: Define and use variables in your GraphQL queries, enabling parameterization and reusability.
- **Headers**: Include custom headers in your GraphQL requests for authentication, authorization, or other purposes.
- **Query History**: Keep track of your previously executed queries and easily access them for future reference.
- **Saving Query Templates**: Save frequently used queries as templates for easy retrieval and reuse in future sessions.

## Tech Stack Used

- **Frontend Framework**: React
- **Type Safety**: TypeScript
- **Authentication and Database**: Firebase (Firebase Authentication for authentication and Firebase Realtime Database for data storage)
- **UI Framework**: Material-UI
- **Code Editor**: CodeMirror
- **State Management**: Redux
- **Localization**: i18next
- **Build Tool**: Vite

## Usage

To build and start the development environment locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Ilichhh/graphiql-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd graphiql-app
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```
4. Replace data in `firebase.ts` file with the configuration data from your project and add your key for firebase auth in `.env` file:

    ```bash
    VITE_FIREBASE_API_KEY=<your-api-key>
    ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your web browser and visit `http://localhost:5173` to access the GraphiQL Playground.