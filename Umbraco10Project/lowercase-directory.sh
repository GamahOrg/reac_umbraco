#!/bin/bash

# Check if a directory name is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

directory="$1"

# Check if the directory exists
if [ ! -d "$directory" ]; then
    echo "Error: Directory '$directory' not found."
    exit 1
fi

# Change to the specified directory
cd "$directory" || exit

# Convert all files to lowercase
for file in *; do
    # Check if it's a file (not a directory)
    if [ -f "$file" ]; then
        # Get the lowercase version of the file name
        new_name=$(echo "$file" | tr '[:upper:]' '[:lower:]')

        # Rename the file to lowercase
        if [ "$file" != "$new_name" ]; then
            mv -i "$file" "$new_name"
            git mv -f "$file" "$new_name"
            echo "Renamed: $file -> $new_name"
        fi
    fi
done
# use git mv -f "$file" "$new_name" to force rename



echo "Conversion to lowercase completed for all files in '$directory'."
