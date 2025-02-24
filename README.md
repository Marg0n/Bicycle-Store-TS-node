<h1 align="center">
  🚲 Bicycle Store  
</h1>

## :memo: Objective:

  Developing an Express application with TypeScript, integrating MongoDB with Mongoose to manage a Bicycle Store. Ensure data integrity using Mongoose schema validation.

## 🛠 Technology Used:

  - Backend Development:

    - Node.js
    - Express.js
    - Mongoose
    - TypeScript

## 🌐 Live server Preview

  [Bicycle-Store](https://bicycle-store-ts-node.vercel.app/)

---

## :wrench: Steps by steps commands to initialize the project:

- ```bash
  npn init -y
  ```
- ```bash
  npm install express --save
  ```
- ```bash
  npm install mongoose --save
  ```
- ```bash
  npm install typescript --save-dev
  ```
- ```bash
  npm i cors
  ```
- ```bash
  npm i dotenv
  ```
- ```bash
  tsc -init
  ```

  - In the `tsconfig.json` find & edit

    ```json
    "rootDir": "./src"
    ```

  - find & edit

    ```json
    "outDir": "./dist"
    ```

- Create a folder named `src` > `app` > `config` > `index.ts`, then paste:

  ```ts
  import dotenv from 'dotenv';
  import path from 'path';

  dotenv.config({ path: path.join((process.cwd(), '.env')) });
  //or
  //dotenv.config({path: path.join(__dirname,'.env')});

  export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
  };
  ```

  then further configure like this:

  ```ts
  import mongoose from 'mongoose';
  import app from './app';
  import config from './app/config';

  async function main() {
    try {
      await mongoose.connect(config.database_url as string);

      app.listen(config.port, () => {
        console.log(`Example app listening on port ${config.port}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
  ```

- Create a folder named `src` > `app.ts` , paste:

  ```js
  import express, { Application, Request, Response } from "express";
  import cors from "cors";
  const app: Application = express();

  // parsers
  app.use(express.json());
  app.use(cors());

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  export default app;
  ```

- ```bash
  npm i --save-dev @types/node
  ```
- ```bash
  npm i --save-dev @types/cors
  ```
- ```bash
  npm i --save-dev @types/express
  ```
- use these changes to `app.ts`

  ```javascript
  import express, { Request, Response } from "express";
  const app = express();
  const port = 3000;

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  export default app;
  ```

- Add `scripts` to json file:

  ```json
      "scripts": {
      "build": "tsc",
  }
  ```

  By doing this terminal can convert the ts to js

  ```terminal
  npm run build
  ```

- Create `src` > `server.ts` , paste:

  ```js
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  ```

- Create `.env` file :

  ```
    PORT = 5000

    DATABASE_URL = mongodb+srv://<db_username>:<db_password>@cluster0.<smth>.mongodb.net/<DBname>?retryWrites=true&w=majority&appName=Cluster0
  ```

- Create `.gitignore` file and add:

  ```
  .env
  node_modules
  dist
  ```

- add the following to `tsconfig.json` :

  ```json
  "include": ["src"], // which files to compile
  "exclude": ["node_modules"], // which files to skip
  ```

- ```bash
  npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
  ```
- ```bash
  npx eslint --init
  ```
- Remodel the `eslint.config.mjs`:

  ```mjs
  import globals from 'globals';
  import pluginJs from '@eslint/js';
  import tseslint from 'typescript-eslint';
  import tsParser from '@typescript-eslint/parser';

  /** @type {import('eslint').Linter.Config[]} */
  export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    {
      languageOptions: {
        globals: globals.node, // Specifies the global variables, making them read-only as required by the flat config system.
        parser: tsParser, // Sets the parser for TypeScript files to ensure ESLint can parse TypeScript syntax correctly.
      },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
      ignores: ['.node_modules/*', 'dist/*'],
      rules: {
        eqeqeq: 'error', // Enforce strict equality
        'no-unused-vars': 'error',
        'no-unused-expressions': 'off', // Disable the original rule
        '@typescript-eslint/no-unused-expressions': 'error', // Use TypeScript-specific rule
        'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
        'no-console': 'warn',
        'no-undef': 'error',
      },
    },
  ];
  ```

- ```bash
  npm remove eslint
  ```
- ```bash
  npm i -D eslint@9.14.0
  ```
- add these scripts to `package.json`

  ```json
  "scripts": {
      "lint": "eslint src/**/*.ts",
      "lint:fix": "eslint src/**/*.ts --fix"
    },
  ```

- To find unused variables
  ```bash
  npm run lint
  ```
- To fix error variables
  ```bash
  npm run lint:fix
  ```
- Add prettier as dev dependencies
  ```bash
  npm i -D --exact prettier
  ```
- create `.prettierrc` and `.prettierignore` file in the root of your project
- Include basic configurations for prettier in the .prettierrc file.

  ```json
  {
    "semi": true,
    "singleQuote": true
  }
  ```

- Also, we need to tell prettier which files to not format So inside `.prettierignore` include the following

  ```
  dist
  coverage
  ```

- Finally we can add scripts for prettier as well in the `package.json` file.

  ```json
  "scripts": {
    "format": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
    "format:fix": "npx prettier --write src/**/*.ts"
  }
  ```

  Note: For all kinds of format: (skip)

  ```json
  "scripts": {
    "format": "prettier . --write",
    "format:fix": "npx prettier --write src/**/*.ts"
  }
  ```

- You’ll likely run into an issue when a Prettier and ESLint rule overlap. You can try to auto-format your code, but it will show you some conflicts with ESLint.

  The best solution here is to use the `eslint-config-prettier` plugin to disable all ESLint rules that are irrelevant to code formatting, as Prettier is already good at it:

  ```bash
  npm install --save-dev eslint-config-prettier
  ```

- With that installed, let’s go to the `eslint.config.mjs` file, and add prettier at the end of your extends list to disable any other previous rules from other plugins:

  ```mjs
  // eslint.config.mjs
  const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

  module.exports = [
    // Any other config imports go at the top
    eslintPluginPrettierRecommended,
  ];
  ```

- Add TS nodemon like dev dependencies

  ```bash
  npm i ts-node-dev
  ```

- Add the following to `package.json`

  ```json
  "scripts": {
    "start:prod": "node ./dist/server.js",
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  }
  ```

- try the following to build in node:

  ```bash
  npm run start:prod
  ```

  or can try to be faster in development environment by (_works same as nodemon_):

  ```bash
  npm run start:dev
  ```

- Add the following to `.env`:

  ```
  NODE_ENV = development #production
  ```

- Create a `vercel.json` file and add:

  ```json
  {
    "version": 2,
    "builds": [
      {
        "src": "dist/server.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "dist/server.js"
      }
    ]
  }
  ```

- Add [zod](https://zod.dev/?id=installation)

  ```bash
  npm install zod 
  ```

- Add [bcrypt](https://www.npmjs.com/package/bcrypt)

  ```bash
  npm i bcrypt 
  ```
  
  ```bash
  npm i @types/bcrypt
  ```
  
- Add [jwt]() for token authentication

  ```bash
  npm i jsonwebtoken
  ```
  
  ```bash
  npm i --save-dev @types/jsonwebtoken
  ```
  
- Add [cookie-parser]() for parse cookies

  ```bash
  npm i cookie-parser
  ```
  
  ```bash
  npm i --save-dev @types/cookie-parser
  ```
  

- Add [http-status-codes](https://www.npmjs.com/package/http-status-codes) for the HTTP status codes

  ```bash
  npm i http-status-codes
  ```

  - Uage

    HTTP status codes are provided as an enum. <br />
    ```typescript
    console.log(HttpStatus.INTERNAL_SERVER_ERROR);
    // => 500
    ```
    You can also obtain a text description. <br />
    ```typescript
    console.log(httpStatusTextByCode(HttpStatus.INTERNAL_SERVER_ERROR));
    // => "Internal Server Error"
    ```

  - HTTP Status Codes

    All [http status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) are included. <br />

    | Enum                            | Code | Text                            | 
    |---------------------------------|------|---------------------------------|
    | CONTINUE                        | 100  | Continue                        |
    | SWITCHING_PROTOCOLS             | 101  | Switching Protocols             | 
    | PROCESSING                      | 102  | Processing                      |
    | EARLY_HINTS                     | 103  | Early Hints                     | 
    | OK                              | 200  | OK                              |
    | CREATED                         | 201  | Created                         |
    | ACCEPTED                        | 202  | Accepted                        |
    | NON_AUTHORITATIVE_INFORMATION   | 203  | Non-Authoritative Information   |
    | NO_CONTENT                      | 204  | No Content                      |
    | RESET_CONTENT                   | 205  | Reset Content                   |
    | PARTIAL_CONTENT                 | 206  | Partial Content                 |
    | MULTI_STATUS                    | 207  | Multi-Status                    |
    | ALREADY_REPORTED                | 208  | Already Reported                |
    | IM_USED                         | 226  | IM Used                         |
    | MULTIPLE_CHOICES                | 300  | Multiple Choices                |
    | MOVED_PERMANENTLY               | 301  | Moved Permanently               |
    | FOUND                           | 302  | Found                           |
    | SEE_OTHER                       | 303  | See Other                       |
    | NOT_MODIFIED                    | 304  | Not Modified                    |
    | USE_PROXY                       | 305  | Use Proxy                       |
    | TEMPORARY_REDIRECT              | 307  | Temporary Redirect              |
    | PERMANENT_REDIRECT              | 308  | Permanent Redirect              |
    | BAD_REQUEST                     | 400  | Bad Request                     |
    | UNAUTHORIZED                    | 401  | Unauthorized                    |
    | PAYMENT_REQUIRED                | 402  | Payment Required                |
    | FORBIDDEN                       | 403  | Forbidden                       |
    | NOT_FOUND                       | 404  | Not Found                       |
    | METHOD_NOT_ALLOWED              | 405  | Method Not Allowed              |
    | NOT_ACCEPTABLE                  | 406  | Not Acceptable                  |
    | PROXY_AUTHENTICATION_REQUIRED   | 407  | Proxy Authentication Required   |
    | REQUEST_TIMEOUT                 | 408  | Request Timeout                 |
    | CONFLICT                        | 409  | Conflict                        |
    | GONE                            | 410  | Gone                            |
    | LENGTH_REQUIRED                 | 411  | Length Required                 |
    | PRECONDITION_FAILED             | 412  | Precondition Failed             |
    | PAYLOAD_TOO_LARGE               | 413  | Payload Too Large               |
    | URI_TOO_LONG                    | 414  | URI Too Long                    |
    | UNSUPPORTED_MEDIA_TYPE          | 415  | Unsupported Media Type          |
    | RANGE_NOT_SATISFIABLE           | 416  | Range Not Satisfiable           |
    | EXPECTATION_FAILED              | 417  | Expectation Failed              |
    | MISDIRECTED_REQUEST             | 421  | Misdirected Request             |
    | UNPROCESSABLE_ENTITY            | 422  | Unprocessable Entity            |
    | LOCKED                          | 423  | Locked                          |
    | FAILED_DEPENDENCY               | 424  | Failed Dependency               |
    | TOO_EARLY                       | 425  | Too Early                       |
    | UPGRADE_REQUIRED                | 426  | Upgrade Required                |
    | PRECONDITION_REQUIRED           | 428  | Precondition Required           |
    | TOO_MANY_REQUESTS               | 429  | Too Many Requests               |
    | REQUEST_HEADER_FIELDS_TOO_LARGE | 431  | Request Header Fields Too Large |
    | UNAVAILABLE_FOR_LEGAL_REASONS   | 451  | Unavailable For Legal Reasons   |
    | INTERNAL_SERVER_ERROR           | 500  | Internal Server Error           |
    | NOT_IMPLEMENTED                 | 501  | Not Implemented                 |
    | BAD_GATEWAY                     | 502  | Bad Gateway                     |
    | SERVICE_UNAVAILABLE             | 503  | Service Unavailable             |
    | GATEWAY_TIMEOUT                 | 504  | Gateway Timeout                 |
    | HTTP_VERSION_NOT_SUPPORTED      | 505  | HTTP Version Not Supported      |
    | VARIANT_ALSO_NEGOTIATES         | 506  | Variant Also Negotiates         |
    | INSUFFICIENT_STORAGE            | 507  | Insufficient Storage            |
    | LOOP_DETECTED                   | 508  | Loop Detected                   |
    | NOT_EXTENDED                    | 510  | Not Extended                    |
    | NETWORK_AUTHENTICATION_REQUIRED | 511  | Network Authentication Required |



- Run the following command to deploy:

  - To login

    ```bash
    npx vercel login
    ```

    Then login to account with github

  - After login, run the following command

    ```bash
    npx vercel --prod
    ```

---

✅ That' all the steps that are required to initialize the project.

---

## 🧑🏻‍💻 What this project do?

  It is just call some api to do basic CRUD operations!

### **1. Create a Bicycle**

  - **Endpoint:** **`/api/products`**
  - **Method:** `POST`
  - **Request Body:**

    ```json
    {
      "name": "Roadster 5000",
      "brand": "SpeedX",
      "price": 300,
      "type": "Road",
      "description": "A premium road bike designed for speed and performance.",
      "quantity": 20,
      "inStock": true
    }
    ```

  - **Response:** Success message and created bicycle details.

    ```json
    {
      "message": "Bicycle created successfully",
      "success": true,
      "data": {
        "_id": "648a45e5f0123c45678d9012",
        "name": "Roadster 5000",
        "brand": "SpeedX",
        "price": 300,
        "type": "Road",
        "description": "A premium road bike designed for speed and performance.",
        "quantity": 20,
        "inStock": true,
        "createdAt": "Sun Nov 24 2024 12:51:13 GMT+0600 (Bangladesh Standard Time)",
        "updatedAt": "Sun Nov 24 2024 12:51:13 GMT+0600 (Bangladesh Standard Time)"
      }
    }
    ```


### **2. Get All Bicycles**

  - **Endpoint:** **`/api/products`**
  - **Method:** `GET`
  - **Response:** A list of all bicycles with details like name, brand, price, type, etc.
  - **Query:** `/api/products?searchTerm=type` (`searchTerm` can be `name`, `brand`, `type`)

    ```json
    {
      "message": "Bicycles retrieved successfully",
      "status": true,
      "data": [
        {
          "_id": "648a45e5f0123c45678d9012",
          "name": "Roadster 5000",
          "brand": "SpeedX",
          "price": 300,
          "type": "Road",
          "description": "A premium road bike designed for speed and performance.",
          "quantity": 20,
          "inStock": true,
          "createdAt": "Sun Nov 24 2024 12:51:13 GMT+0600 (Bangladesh Standard Time)",
          "updatedAt": "Sun Nov 24 2024 12:51:13 GMT+0600 (Bangladesh Standard Time)"
        }
      ]
    }
    ```


### **3. Get a Specific Bicycle**

  - **Endpoint:** **`/api/products/:productId`**
  - **Method:** `GET`
  - **Response:** The details of a specific bicycle by ID.

    ```json
    {
      "message": "Bicycle retrieved successfully",
      "status": true,
      "data": {
        "_id": "648a45e5f0123c45678d9012",
        "name": "Roadster 5000",
        "brand": "SpeedX",
        "price": 300,
        "type": "Road",
        "description": "A premium road bike designed for speed and performance.",
        "quantity": 20,
        "inStock": true,
        "createdAt": "Sun Nov 24 2024 12:51:13 GMT+0600 (Bangladesh Standard Time)",
        "updatedAt": "Sun Nov 24 2024 12:51:13 GMT+0600 (Bangladesh Standard Time)"
      }
    }
    ```


### **4. Update a Bicycle**

  - **Endpoint:** **`/api/products/:productId`**
  - **Method:** `PUT`
  - **Request Body:** (Bicycle details to update)

    ```json
    {
      "price": 350,
      "quantity": 15
    }
    ```

  - **Response:** Success message and updated bicycle details.

    ```json
    {
      "message": "Bicycle updated successfully",
      "status": true,
      "data": {
        "_id": "648a45e5f0123c45678d9012",
        "name": "Roadster 5000",
        "brand": "SpeedX",
        "price": 350, // Price updated
        "type": "Road",
        "description": "A premium road bike designed for speed and performance.",
        "quantity": 15, // Quantity updated
        "inStock": true,
        "createdAt": "Sun Nov 24 2024 12:51:13 GMT+0600 (Bangladesh Standard Time)",
        "updatedAt": "Mon Nov 25 2024 12:51:13 GMT+0600 (Bangladesh Standard Time)" // Updated timestamp
      }
    }
    ```


### **5. Delete a Bicycle**

  - **Endpoint:** **`/api/products/:productId`**
  - **Method:** `DELETE`
  - **Response:** Success message confirming the bicycle has been deleted.

    ```json
    {
      "message": "Bicycle deleted successfully",
      "status": true,
      "data": {}
    }
    ```


### **6. Order a Bicycle**

  - **Endpoint:** **`/api/orders`**
  - **Method:** `POST`
  - **Inventory Management Logic:**
    - When an order is placed, reduce the **quantity** in the product model.
    - If the inventory quantity goes to zero, set **inStock** to `false`.
    - Handle **insufficient stock** cases by returning an appropriate error message.
  - **Request Body:**

    ```json
    {
      "email": "customer@example.com",
      "product": "648a45e5f0123c45678d9012",
      "quantity": 2,
      "totalPrice": 600
    }
    ```

  - **Response:** Success message confirming the order.

    ```json
    {
      "message": "Order created successfully",
      "status": true,
      "data": {
        "_id": "648b45f5e1234b56789a6789",
        "email": "customer@example.com",
        "product": "648a45e5f0123c45678d9012",
        "quantity": 2,
        "totalPrice": 600,
        "createdAt": "Sun Nov 24 2024 12:51:13 GMT+0600 (Bangladesh Standard Time)",
        "updatedAt": "Sun Nov 24 2024 12:51:13 GMT+0600 (Bangladesh Standard Time)"
      }
    }
    ```


### **7. Calculate Revenue from Orders (Aggregation)**

  - **Endpoint:** **`/api/orders/revenue`**
  - **Method:** `GET`
  - **Aggregation Suggestion:**
    - Use MongoDB aggregation pipeline to calculate the total revenue from `all orders`.
    - Calculate the total price by multiplying the price of each bicycle by the quantity ordered.
  - **Response:** The total revenue from all orders.

    ```json
    {
      "message": "Revenue calculated successfully",
      "status": true,
      "data": {
        "totalRevenue": 1200 // Total revenue calculated from all orders
      }
    }
    ```

### **8. Authentication**

  1. #### Register User

      - **Endpoint:** **`/api/auth/register`**
      - **Method:** `POST`
      - **Description:** Registers a new user with the platform. It validates user data and saves it to the database.
      - **Request Body:**

        ```json
        {
          "name": "John Doe",
          "email": "john@example.com",
          "password": "securepassword"
        }
        ```
      - **Response:**

        *   **Success (201):**

            ```json
            {
              "success": true,
              "message": "User registered successfully",
              "statusCode": 201,
              "data": {
                "_id": "string",
                "name": "string",
                "email": "string"
              }
            }
            ```

        *   **Failure (400):**

              ```json
              {
                "success": false,
                "message": "Email is already being used!",
                "statusCode": 400,
                "error": { "details" },
                "stack": "error stack"
              }
              ```

  2. #### Login User

      - **Endpoint:** **`/api/auth/login`**
      - **Method:** `POST`
      - **Description:** Authenticates a user with their email and password and generates a JWT token.
      - **Request Body:**

        ```json
        {
          "email": "john@example.com",
          "password": "securepassword"
        }
        ```
      - **Response:**

        *   **Success (200):**

            ```json
            {
              "success": true,
              "message": "Login successful",
              "statusCode": 200,
              "data": {
                "token": "string"
              }
            }
            ```

        *   **Failure (401):**

              ```json
              {
                "success": false,
                "message": "Invalid credentials",
                "statusCode": 401,
                "error": { "details" },
                "stack": "error stack"
              }
              ```
  
<br/>

---

🧑🏻‍💼 That's all the short description of these projects. Thank you for the reading! ✌️