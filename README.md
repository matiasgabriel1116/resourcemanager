# Project Manager App

A full-stack resource management application built with Laravel 10, Vue 3, Inertia.js, Pinia, PostgreSQL 15, and Pest for testing. This app supports real-time frontend updates and efficient data handling via pagination and filtering.

## 🛠 Tech Stack

-   **Backend**: Laravel 10
-   **Frontend**: Vue 3 + Inertia.js + Pinia
-   **Database**: PostgreSQL 15
-   **Testing**: PestPHP 2.0
-   **Build Tool**: Vite

## 🚀 Features

-   Create, update, delete, and list projects
-   Debounced search with pagination
-   Real-time UI updates without page reloads
-   REST API endpoints for JSON responses
-   Fully tested using Pest

## 📦 Installation

1. **Clone the repository**

    ```bash
    git clone git@github.com:matiasgabriel1116/resourcemanager.git
    cd resource-manager
    ```
    
2. **Install dependencies**

    ```bash
    composer install
    npm install
    ```

3. **Set up your environment**

    Copy .env.example to .env and configure your DB and other variables:

    ```bash
    cp .env.example .env
    php artisan key:generate

    ```

4. **Create your database**

    Make sure you have a PostgreSQL database created and configured in your .env.

5. **Run migrations and seeders**

    ```bash
    php artisan migrate --seed

    ```

6. **Start the dev servers**

    ```bash
    php artisan serve
    npm run dev
    ```
