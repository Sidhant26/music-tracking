# Introduction

This is a full-stack web application that allows users to search for albums and artists, view detailed information, rate albums, and track their music preferences.

Last\.fm's API does not provide artist's images, they only provide album cover art, which is why the search page for artists and the artist pages are relatively stripped down.

Key Features:
- Search for albums and artists using the Last.fm API.
- Rate albums and add personal notes, which are saved to a MongoDB database.
- Authentication system using JWT.
- Personalized user rating that displays rated albums and favorite/frequented tags (using MongoDB's aggregation).
- Responsive UI built with Material UI (MUI).

Technologies used:
- **Frontend:** Vite (for speed and HMR) + React, MUI, Axios
- **Backend:** Express.js, Node.js, MongoDB, JWT for authentication
- **Third-Party API:** Last.fm for artist and album data

# How to run it

- Clone
- Install dependencies using npm install.
- Set up environment variables: Port, JWT secret, and your Last\.fm API key (variable names in the code might change based on what you're using to create your React app).
- If you're using Vite, use npm run dev in the frontend, otherwise just run it normally.

# Screenshots
![image](https://github.com/user-attachments/assets/4c71fcf2-aba8-4d8d-a278-e7bb23f57cd7)
![image](https://github.com/user-attachments/assets/ae3fe6ed-099d-43a6-83e4-6f59554c8125)
![image](https://github.com/user-attachments/assets/dfc7998c-a795-4f25-9c5e-0b87dace236f)
![image](https://github.com/user-attachments/assets/f1c21952-6703-4722-8306-8dd81be8f57d)
![image](https://github.com/user-attachments/assets/14321c6c-555a-484b-b12b-c9cd27c3d990)
![image](https://github.com/user-attachments/assets/b3d584f8-7644-4d4d-8fbc-148a984c97d8)
