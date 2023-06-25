### Application Routes:

#### User
- `api/v1/auth/signup` (POST)
- `api/v1/users` (GET)
- `api/v1/users/648e1a37f297f1f524bc9ea0` (Single GET)
- `api/v1/users/648e1a37f297f1f524bc9ea0` (PATCH)
- `api/v1/users/648e1a37f297f1f524bc9ea0` (DELETE)

#### Cows
- `api/v1/cows` (POST)
- `api/v1/cows` (GET)
- `api/v1/cows/648eb7bfb66ab5115f7403be` (Single GET)
- `api/v1/cows/648eb7bfb66ab5115f7403be` (PATCH)
- `api/v1/cows/648ee3b48456a3a9ea530382` (DELETE)

#### Pagination and Filtering routes of Cows
- `api/v1/cows?pag=1&limit=10`
- `api/v1/cows?sortBy=price&sortOrder=asc`
- `api/v1/cows?minPrice=20000&maxPrice=70000`
- `api/v1/cows?location=Chattogram`
- `api/v1/cows?searchTerm=Cha`

#### Orders
- `api/v1/orders` (POST)
- `api/v1/orders` (GET)


### Live Link : https://digital-cow-hat-backend-nine.vercel.app/