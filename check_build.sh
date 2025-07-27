#!/bin/bash
echo "🚀 Starting build process..."
cd /Users/bohainmathis/Desktop/babershop
npm run build > build_output.txt 2>&1 &
BUILD_PID=$!

# Attendre 30 secondes maximum
sleep 30

# Vérifier si le processus est toujours en cours
if kill -0 $BUILD_PID 2>/dev/null; then
    echo "⚠️ Build seems to be hanging, killing process..."
    kill $BUILD_PID
    echo "❌ Build was terminated due to timeout"
    echo "📄 Last output:"
    tail -20 build_output.txt
    exit 1
else
    wait $BUILD_PID
    EXIT_CODE=$?
    if [ $EXIT_CODE -eq 0 ]; then
        echo "✅ Build completed successfully!"
        echo "📄 Build output:"
        cat build_output.txt
    else
        echo "❌ Build failed with exit code: $EXIT_CODE"
        echo "📄 Error output:"
        cat build_output.txt
    fi
    exit $EXIT_CODE
fi
