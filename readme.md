# IncogntioApps Work Trial Guide

Hey there, here are the instructions to start working on your work trial.

Step 1 => First of all make sure you have installed these extensions in vscode

1. Prettier - Code formatter
2. Eslint
3. PostCSS Language Support
4. Prettier ESLint
5. Tailwind CSS IntelliSense
6. Prisma
7. Github Copilot (optional)

Step 2 => Go to each folder (frontend, backend) and install the dependencies with yarn

Step 3 => Create .env file in backend and check .env.example to put values in it.

Step 4 => Put the given database url in the .env file

Step 5 => Run the frontend and backend by going to each folder and running yarn dev in both folders.

Step 6 => You have successfully setup the project, now start working on your tasks and let us know if you face any problem setting up the project.

Step 7 => Good luck!

TASKS

1. Build a page that shows a wall of all the recognitions shared in the database
2. Each recognition will be a card that displays cleanly all of the data for that recognition
3. The page should be searchable/filterable
   - Search by giver/receiver name or recognition message
   - Filter by date range
   - Filter by company values
4. The page should use the React-Masonry-CSS package to build the "Wall of recognitions"
5. The page should load 30 recognitions and then load 30 more when you hit the bottom to create an infinite scroll
6. Most of the design should be done using Mantine components. Any custom design/tweaking should use Tailwind CSS
7. Create a new workplace in slack, and install our app (search Incognito AI on slack app directory). Now head to https://app.incognitoapps.com/login and login to the dashboard. Record yourself while exploring each and every feature and give feedback on it, like how we can improve that feature?, is that feature easy to understand?, is the UI of the feature good? etc.
