# Frontend Challenge

# Project Setup Guide

## Prerequisites

- Node.js
- npm
- Prisma CLI

## Installation

1. Clone the repository:
`git clone <repository-url>`
2. pnpm install
`pnpm install`

## Database Setup

1. Install Prisma CLI globally:
 npm install -g prisma`

2. Generate Prisma client:
`pnpx prisma generate`

3. Add the database URL to the .env file:
`DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database-name>?schema=public"`

