### Live Link : https://digital-cow-hat-bcknd-as-4.vercel.app/

### Application Routes:

## Main part

#### Auth (User)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/auth/login (POST)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/auth/signup (POST)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/auth/refresh-token (POST)

#### Auth (Admin)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/admins/create-admin (POST)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/admins/login (POST)


#### User
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/users (GET)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/users/64bec46d0f453a5bb24a0698 (Single GET)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/users/64bec46d0f453a5bb24a0698 (PATCH)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/users/64c7e7357cd81ac7c606c51a (DELETE)


#### Cows
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/cows (POST)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/cows (GET)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/cows/64becdcc1fda6d607df1a13f (Single GET)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/cows/64becdcc1fda6d607df1a13f (PATCH)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/cows/64c81298ef5ecbaf3e4b551c (DELETE) 


#### Pagination and Filtering routes of Cows
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/cows?pag=1&limit=10 (GET)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/cows?sortBy=price&sortOrder=asc (GET)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/cows?minPrice=20000&maxPrice=70000 (GET)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/cows?location=Chattogram (GET)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/cows?searchTerm=Cha (GET)
 
#### Orders
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/orders (POST)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/orders (GET)


## Bonus Part

### Admin
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/admins/create-admin (POST)

### My Profile
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/users/my-profile (GET)
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/users/my-profile (PATCH)

### Admin
- Route: https://digital-cow-hat-bcknd-as-4.vercel.app/api/v1/orders/6177a5b87d32123f08d2f5d4 (GET)