#!/bin/bash

echo "📚 Setting up Lecture Scheduling Module..."

# Install backend dependencies
echo "Installing backend dependencies..."
cd server
npm install

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../client
npm install

echo ""
echo "✅ Installation complete!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Make sure MongoDB is running:"
echo "   mongod"
echo ""
echo "2. In one terminal, start the backend:"
echo "   cd server && npm run dev"
echo ""
echo "3. In another terminal, start the frontend:"
echo "   cd client && npm run dev"
echo ""
echo "4. Open your browser and go to http://localhost:3000"
echo ""
echo "Demo credentials:"
echo "Email: admin@example.com"
echo "Password: admin123"
