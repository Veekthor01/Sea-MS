## Sea-MS

#### Sea-MS is a Content Management System (CMS) built with TypeScript, React(Vite), Express.js and MongoDB. 
#### It allows users to create and manage blogs, portfolios, and resumes with ease. 

### Features

* **User Authentication**: Secure user authentication implemented with Passport.js and JWT.
* **Template Selection and Editing**: Pick a template and edit it to create your own unique website.
* **Rich Text Editing**: Integrated with React-Quill for rich text editing.
* **Dashboard**: All your creations are saved in your dashboard for easy access.
* **Image Storage**: Uses Google Cloud Storage (GCS) bucket for storing images.

### Usage

1. __Pick a Template__: Choose a template from the collection.

2. __Editing__: Customize the selected template by adding or modifying content.

3. __Save and Access__: Save the edited template to your dashboard for future access.

### Technologies

* __Frontend__: React
* __Backend__: Express
* __Programming Language__: TypeScript
* __Database__: MongoDB
* __Image Storage__: Google Cloud Storage
* __Rich Text Editor__: React-Quill
* __User Authentication__: Passport.js and JWT.
* __API caching__: Redis
* __Testing__: Jest

### Installation
#### To run Sea-MS on your local machine, clone or download the repository and follow these steps:

#### To run the Express backend:
Change into the project directory e.g
```
cd server
```
Install dependencies:
```
npm install
```
Start the dev server:
```
npm run dev
```
The development server will start at http://localhost:5000.

#### To run the React frontend:
Change into the project directory e.g
```
cd client
```
Install dependencies:
```
npm install
```
Start the dev server:
```
npm run dev
```
The development server will start at http://localhost:5173. You can open this URL in your web browser to view Sea-MS.

### Set up environmental variables

#### For Express backend: 
Create a .env file in the root directory,
You need to set the following in your .env file:
- `FRONTEND_URL`: The URL of the frontend application.
- `SECRET_KEY`: The secret key for cookie management.
- `MONGODB_URI`: The URI of your MongoDB database.
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID.
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret.
- `JWT_SECRET`: The secret key for token management.
- `GOOGLE_STORAGE_BUCKET_NAME`: Your GCS bucket name.
- `GOOGLE_CLOUD_KEY`: API key for access to your GCS bucket.

#### For React:
in your .env.local file,
You need to set the following in your .env.local file:
 - `VITE_BACKEND_URL`: The URL of the backend application.
 - `VITE_FRONTEND_URL`: The URL of the frontend application.

### Licensed By MIT
