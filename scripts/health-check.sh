#!/bin/bash

echo "🏥 Health Check - Personal & Aluno"
echo "=================================="
echo ""

# Check Node version
echo "📦 Node Version:"
node --version
echo ""

# Check pnpm
echo "📦 pnpm Version:"
pnpm --version
echo ""

# Check dependencies
echo "📦 Checking dependencies..."
if [ -d "node_modules" ]; then
  echo "✅ node_modules exists"
else
  echo "❌ node_modules not found - run: pnpm install"
fi
echo ""

# Check env file
echo "🔐 Checking environment..."
if [ -f ".env.local" ]; then
  echo "✅ .env.local exists"
else
  echo "⚠️  .env.local not found - copy from .env.example"
fi
echo ""

# Type check
echo "🔍 Type checking..."
pnpm type-check
if [ $? -eq 0 ]; then
  echo "✅ Type check passed"
else
  echo "❌ Type check failed"
fi
echo ""

# Lint
echo "🧹 Linting..."
pnpm lint --max-warnings 0
if [ $? -eq 0 ]; then
  echo "✅ Lint passed"
else
  echo "❌ Lint failed"
fi
echo ""

# Build test
echo "🏗️  Testing build..."
pnpm build
if [ $? -eq 0 ]; then
  echo "✅ Build successful"
else
  echo "❌ Build failed"
fi
echo ""

echo "=================================="
echo "✅ Health check complete!"
