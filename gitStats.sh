#!/bin/bash

echo "Number of commits for each author: "
git shortlog --numbered --summary --no-merges

authorInfo=$(git log --pretty="%an" | sort | uniq)
authors=$(echo "$authorInfo" | cut -d ' ' -f 1)
# echo "$authors"

for author in $authors
do
    echo -e "\nAuthor: $author"
    echo "Number of lines"
    echo "Added | Deleted | File  Modified"
    git log --author="$author" --pretty=tformat: --numstat | grep -v '^-'
    echo "Total:"
    git log --author="$author" --pretty=tformat: --numstat | grep -v '^-' | awk '{ add+=$1; remove+=$2 } END { print add, remove }' 

done

codeFiles=$(find . -name "*.java")
echo -e "\nAll the code files: "
echo "$codeFiles"
