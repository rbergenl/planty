Planty
======

# Features
- Register and authenticate user
- Add and monitor Planty Box
- Schedule meals
- Receive meal crop recipes

# Application Walkthrough
- User Login screen
- User Register screen
- User Profile screen
- Planty Boxes overview screen
- Planty Box detail screen
- Meals schedule screen
- Meals overview screen
- Meal detail screen
- Crops overview screen
- Crop detail screen

# Architecture Walkthrough

## Used Services
- Firebase Authentication (using OpenID Connect)
- Authenticate clients with Amazon Cognito (using OpenID Connect) and attach IoT policies to allow clients to:
    - Connect to the AWS IoT Device Gateway
    - Publish messages to specific topics
    - Subscribe & receive messages from specific topics
- Serverless computing with Firebase Functions
- Static site Hosting on Firebase Hosting
- App persistence via FireStore