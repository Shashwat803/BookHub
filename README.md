# BookHub

BookHub is a full-stack web application built with modern technologies to manage books and authors. The project consists of a Next.js frontend and a Node.js backend, both written in TypeScript. The frontend uses Tailwind CSS for styling, shadcn/ui for UI components, Clerk for authentication, and Apollo Client for GraphQL queries. The backend uses Express, Apollo Server, Sequelize as the ORM, and PostgreSQL as the database.

## Features
- **Book Management**: Users can create, update, delete, and view books.
- **Author Management**: Users can create, update, delete, and view authors.
- **Authentication & Authorization**: Secure authentication with Clerk.
- **GraphQL API**: Efficient data fetching and manipulation using Apollo Client.
- **Optimized UI**: Styled with Tailwind CSS and shadcn/ui for a seamless experience.

## Technologies Used

### Frontend
- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Strongly typed JavaScript for better developer experience.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS.
- **Clerk**: Authentication and user management.
- **Apollo Client**: GraphQL client for managing data fetching and state.

### Backend
- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for Node.js.
- **Apollo Server**: GraphQL server for handling queries and mutations.
- **Sequelize**: ORM for interacting with the PostgreSQL database.
- **PostgreSQL**: Relational database for storing application data.
- **TypeScript**: Strongly typed JavaScript for the backend.

## Getting Started

### Prerequisites
- **Node.js**: Ensure you have Node.js installed (v18 or higher recommended).
- **PostgreSQL**: Install and set up a PostgreSQL database.
- **pnpm**: Install pnpm globally using `npm install -g pnpm`.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/BookHub.git
   cd BookHub
   cd client
   pnpm install
   cd ../server
   pnpm install

### Environment Variables

```bash
Client
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_API_URL=http://localhost:9000/graphql
NEXT_PUBLIC_IMAGEBASE_URL=http://localhost:9000/

Server
# Database Configuration
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
```
### Start Project 
```bash
Server
cd server
pnpm run dev

Client
cd client
pnpm run dev
```

