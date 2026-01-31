#!/bin/bash
# Script to delete all copilot/* branches
# This script should be run by someone with write access to the repository

set -e

echo "Fetching latest branch information..."
git fetch --all --prune

echo ""
echo "Finding all copilot/* branches..."
COPILOT_BRANCHES=$(git branch -r | grep -E "origin/copilot/" | sed 's/origin\///' | sed 's/^[[:space:]]*//')

if [ -z "$COPILOT_BRANCHES" ]; then
    echo "No copilot/* branches found."
    exit 0
fi

echo "The following copilot/* branches will be deleted:"
echo "$COPILOT_BRANCHES"
echo ""

read -p "Are you sure you want to delete these branches? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Deletion cancelled."
    exit 0
fi

echo ""
echo "Deleting copilot/* branches from remote..."
while IFS= read -r branch; do
    if [ -n "$branch" ]; then
        echo "Deleting remote branch: $branch"
        git push origin --delete "$branch"
    fi
done <<< "$COPILOT_BRANCHES"

echo ""
echo "Cleaning up local tracking branches..."
git fetch --prune

echo ""
echo "All copilot/* branches have been deleted successfully!"
