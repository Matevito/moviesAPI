# VERSION 0.4.0

## Added

- Get one user with it's watched movies list.
- todo: Get users list with it's corresponding watched movies.
- todo: Route that shows movies novelties list.

# VERSION 0.3.0

## Added

- Added get users services.

- Added create movies controller and movies validator.
- Added create category controller and category validator.
- Added mark movie as watched for a user route.

## Fix

- Modulated the sql commands used on the services

# VERSION 0.2.0

## Added

- Added workable signup functionality. A user can be created.
- Added workable login functionality.
- Added jwt authentication middleware.

## FIX

- Solved bugg with v4 of express handling controllers that return void promises.

# VERSION 0.1.1

## Fix

- Signin and Singup routes are now separated of the user routes into the auth route.

# VERSION 0.1.0

## Added

- The express app runs correctly.

- Added the folder structure of the app using a MVC architecture.

- The routes of the v1 of the app are accessible.

- Added database pool client configuration.
