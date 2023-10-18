current_branch=$(git rev-parse --abbrev-ref HEAD)
pattern="release/*"

if [[ $current_branch =~ $pattern ]]; then
  version=$(echo "$current_branch" | grep -oE "v[0-9]+\.[0-9]+\.[0-9]+")
else
  releases=$(git branch -a | grep release/*)
  last_release=$(echo "$releases" | grep -oE "release/v[0-9]+\.[0-9]+\.[0-9]+" | awk -F'/' '{print $NF}' | sort -V | tail -n1)
  echo "Last release version: $last_release"

  release_branch="origin/release/$last_release"

  branch_point=$(git merge-base "$release_branch" HEAD)
  commit_count=$(git rev-list --count "$branch_point"..HEAD)
  version="$last_release.$commit_count"

  echo "New version: $version"
  echo "Branch point: $branch_point"
  echo "Commit count: $commit_count"

fi

file_content="export const version = \"$version\";"

echo "$file_content" > src/app/version.ts

./update_ios_version.sh
