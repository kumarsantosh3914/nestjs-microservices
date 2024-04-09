# Nest.js Application 

## Description

This repository contains a simple Nest.js application that desmonstrates order functionality using MongoDB as the database.

## Features

- **Order Management:** Provides functionalities for creating, updating, listing, and deleting orders.
- **RESTful APIs:** Expose an API to update a order

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- MongoDB

## Installation

1. Clone the repository:

```
git clone https://github.com/kumarsantosh3914/nestjs-microservices.git
```

2. Install dependencies:

```
cd nestjs-microservices
npm install
```

## Configuration

1. Create a `.env` file in the root directory of the project and specify the following environment variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ordering_app
```

## Usage

1. Run the application:

```
npm run start:dev service_name
```

2. The application should now be running on `http://localhost:3000`.