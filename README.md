# The Daily Lotto　デイリー・ロト
  
### The app for lottery lovers! The Daily Lotto will generate a set of 6 random numbers to be used on your next lottery ticket (Mega Millions, Powerball, Hoosier Lottery) then you can store those numbers and ticket info in your account. 
宝くじをこよなく愛するあなたのためのこのアプリ、なんとラッキーな６セットの番号を自動生成してくれます。あなたはこの番号を次回店頭や専用アプリアカウント上で購入するチケット（メガミリオン、パワーボール、フージアーロト対象）に転記するだけ！！


## Created by Team 4:
  - Mitchell -- github.com/MitchReed123
  - Mizue -- github.com/mobara121
  - Brittany -- github.com/bmagee2
  
  
## App Features
  
###  Users:
    - Create a personalized user account
    - Reset username/password
    - Generate set of 6 random numbers to be used when purchasing a lottery ticket
    - Log generated numbers and lottery ticket info in account 
    - Update and delete logged info
    - Search places to buy lottery tickets in central Indianapolis on location menu or Google Maps
    - Add a lottery location to menu if not listed
    
###  Admins:
    - Create, update or delete Daily Lotto users and lottery locations   


## App Endpoints

###  Users: ~/user
  
        POST /signup        => Registers new user account
        POST /AdminSignUp   => Admin account added
        POST /login         => Logs in a user
        GET /               => Gets all users for Admin
        UPDATE/:id          => Admin & User can update user info
        DELETE/:id          => Admin & User can delete user profile

###  Lottos: ~/lotto
  
        GET/            => Gets all lotto info
        POST/           => Inputs new data to DB
        GET/:id         => Gets an individual input by ID
        PUT/:id         => Updates a specific item in the DB by ID
        DELETE/:id      => Deletes a specific item in the DB by ID

###  Destinations: ~/destination
  
        GET/            => Shows all the destinations available to on DB
        POST/           => Allows a user to post a new location that the Admin then can Delete/Update
        GET/:id         => Pulls specific Destinations to view
        PUT/:id         => Allows the Admin user to update/fix a location that was submitted to the table
        DELETE/:id      => Allows the Admin user to delete a location that is on the DB       


## Take a look at The Daily Lotto

### Login/Signup
![Login:Signup](https://user-images.githubusercontent.com/12259461/87594167-883ae800-c6ba-11ea-90c7-787f92365541.png)

### User Profile
![User Profile](https://user-images.githubusercontent.com/12259461/87594192-94bf4080-c6ba-11ea-9b73-6ddf06cf24fa.png)

### Location Search
![Locations Search](https://user-images.githubusercontent.com/12259461/87594220-a1439900-c6ba-11ea-9284-2c98c5bd8b2b.png)


![Locations Map](https://user-images.githubusercontent.com/12259461/87594251-adc7f180-c6ba-11ea-9b94-72304032fd20.png)


### User Username/Password Reset

![User Update Username:Password](https://user-images.githubusercontent.com/12259461/87594274-b7e9f000-c6ba-11ea-9b84-29828a5b9132.png)

### Admin Panel

![Admin Panel 1](https://user-images.githubusercontent.com/12259461/87594303-c2a48500-c6ba-11ea-9fc2-8770672a6d3c.png)

![Admin Panel 2](https://user-images.githubusercontent.com/12259461/87594345-ccc68380-c6ba-11ea-9bcf-fef5b88f2aee.png)

### Navbar/Dropdown Menu

![Navbar:Dropdown Menu](https://user-images.githubusercontent.com/12259461/87594363-d64feb80-c6ba-11ea-9c12-dcbcfbf1dcbb.png)



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
