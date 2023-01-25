# Kitchen Grocery Application

A web application written in NestJS and Mikro-ORM that helps you keep track of the items in your pantry. With this application, you can easily see what is in your pantry, as well as additional notes on items stored such as expiration date and cooking times.

## Features

- **Inventory Management:** Keep track of the items in your pantry, including the quantity of each item and the date it was last updated.
- **Expiration Dates:** Add expiration dates to your pantry items to ensure that you use them before they go bad. The application will automatically remind you when an item is about to expire.
- **Cooking Times:** Add cooking times to your pantry items to help plan your meals. The application will show you the total cooking time for all of the items in your pantry.
- **Search and Filter:** Easily search and filter through your pantry items by name, expiration date, and cooking time.
- **Reporting:** Generate reports on your pantry inventory and usage to help you make informed decisions about your grocery shopping.

## Getting started

1. Clone the repository and install the dependencies:

```
git clone https://github.com/yourusername/kitchen-grocery-application.git
cd kitchen-grocery-application
npm install
```

2. Create a new database and update the connection settings in the `ormconfig.json` file.
3. Run the migration command to create the necessary tables:

```
npx mikro-orm migration:run
```

1. Start the application:

```
npm run start
```

1. The application will be available at `http://localhost:3000`

## Contribute

We welcome contributions to the Kitchen Grocery Application. If you find a bug or have an idea for a new feature, please open an issue on GitHub
