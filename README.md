# Capstone Level 3 - Order Ice (fullstack)

## Overview

Fullstack application that uses the MERN to allow users to order ice from a local Cape Town ice manufacturer.

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### Table of Contents

    1. Installation
    2. Usage
    3. Security
    4. Link

### Installation

1. Download and extract the zip files.
2. Run `yarn install` from the root folder and also from inside the client folder.
3. Navigate to the client folder and run `yarn install`
3. Create a .env file and add the environment variable `REACT_APP_API=http://127.0.0.1:3001/api/v1`
4. Return to the root folder and run `yarn run dev` to start both the frontend and backend server
4. View the app on localhost:3000 of your preferred browser.
5. MongoDB is hosted online.


### Usage

Select any ice product you wish to order and add it to your cart. Add or reduce the product quantity and proceed, to checkout. You will be asked to sign up or login. After signing up or logging in successfully you will be returned to the checkout page. Choose your preferred payment method and time of delivery then proceed to place your order. Use your dashboard to view your order and profile details. The admin dashboard is used to view all orders and to change the order status.

### Security

Used Helmet and added it to the express middleware to add a layer of security to the API.
API that were used were placed in a .env file which was added to .gitignore.

### Link

https://eishya.netlify.app/