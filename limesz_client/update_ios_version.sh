#!/bin/bash

# Path to the Info.plist file
plist_path="ios/App/App/Info.plist"

# Path to the version.ts file
version_file="src/app/version.ts"

# Read the version number from version.ts using sed and remove the 'v' prefix
version=$(sed -n 's/export const version = "v\(.*\)";/\1/p' "$version_file")

# Update the version number in the Info.plist file
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $version" "$plist_path"
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $version" "$plist_path"
