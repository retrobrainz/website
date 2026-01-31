# Deleting Copilot/* Branches

This document provides instructions for deleting all `copilot/*` branches from the repository.

## Current Copilot Branches

As of the time of this documentation, the following `copilot/*` branch exists:
- `copilot/delete-all-copilot-branches`

## Method 1: Using the Provided Script

A bash script (`delete-copilot-branches.sh`) has been provided to automate the deletion process.

### Prerequisites
- Write access to the repository
- Git installed and configured
- Repository cloned locally

### Steps
1. Navigate to the repository directory
2. Make the script executable:
   ```bash
   chmod +x delete-copilot-branches.sh
   ```
3. Run the script:
   ```bash
   ./delete-copilot-branches.sh
   ```
4. Review the list of branches that will be deleted
5. Confirm the deletion when prompted

## Method 2: Manual Deletion Using Git Commands

### Delete a specific copilot branch
```bash
# Delete from remote
git push origin --delete copilot/branch-name

# Delete local branch (if checked out)
git branch -d copilot/branch-name
# Or force delete
git branch -D copilot/branch-name
```

### Delete all copilot/* branches at once
```bash
# Fetch latest information
git fetch --all --prune

# List all copilot branches
git branch -r | grep "origin/copilot/"

# Delete all copilot branches from remote
git branch -r | grep "origin/copilot/" | sed 's/origin\///' | xargs -I {} git push origin --delete {}

# Clean up local tracking references
git fetch --prune
```

## Method 3: Using GitHub CLI (gh)

If you have the GitHub CLI installed:

```bash
# List all branches
gh api repos/retrobrainz/website/branches --paginate | jq -r '.[].name' | grep "^copilot/"

# Delete each copilot branch
gh api repos/retrobrainz/website/branches --paginate | jq -r '.[].name' | grep "^copilot/" | xargs -I {} gh api -X DELETE repos/retrobrainz/website/git/refs/heads/{}
```

## Method 4: Using GitHub Web Interface

1. Go to https://github.com/retrobrainz/website/branches
2. Search for "copilot/"
3. Click the delete icon (trash can) next to each copilot/* branch

## Notes

- Deleting a branch that is currently checked out requires switching to a different branch first
- The `copilot/delete-all-copilot-branches` branch (the one used for this task) should also be deleted after this PR is merged
- Branch deletions are permanent and cannot be undone through normal Git operations (though the commits remain accessible via their SHA hashes)
- Protected branches cannot be deleted without first removing branch protection rules

## Verification

After deletion, verify that no copilot/* branches remain:

```bash
git fetch --all --prune
git branch -r | grep "copilot/"
```

If the command returns no results, all copilot/* branches have been successfully deleted.
