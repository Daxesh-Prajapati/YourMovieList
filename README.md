## Getting Started

To run this application, follow the steps below:

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js and npm: [Install Node.js and npm](https://www.geeksforgeeks.org/how-to-install-node-run-npm-in-vs-code/)

### Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/DarpanD/YourMovieList.git
   cd YourMovieList
   ```
2. **API KEY Creation Request**

   - Log in to the TMDB [TMDB Website](https://www.themoviedb.org/)
   - Click on Request for API key to get your own api key on [Api Page](https://www.themoviedb.org/settings/api)
   - Copy the API key displayed on the screen.
   ![ApiKeyHelp](./public/ReadmeHelpFiles/API%20KEY.jpg)

3. **Configure API Key**

   **_ option 1 _**

   - Navigate to public/config_token.js in your project directory.
   - Paste the API key into the variable token inside the single quotation marks.
   - ![apiKeyHelp](./public/ReadmeHelpFiles/API%20Token.png)
   - Save the file.

   **_ option 2 _**

   - Create a `.env` file in the root of the project.
   - Add your TMDB API key to the `.env` file like this:

   ```bash
      VITE_API_TOKEN= 'your_api_key_here';
   ```

4. Install Dependencies
   ```bash
       npm install
   ```
5. Run the Application

   ```bash
       npm run dev
   ```

> [!Note]
> ##Troubleshooting
> If you encounter any issues, ensure Node.js and npm are correctly installed. Refer to this guide for assistance: How to Install Node.js and npm.
