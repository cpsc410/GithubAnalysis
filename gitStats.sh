#!/bin/bash

# params to change
lang="java" #primary language extention used in repo

codeFiles=$(find . -name "*.java")
echo -e "\nAll the code files: " > stats.txt 
echo "$codeFiles" >> stats.txt 

echo -e "\nNumber of commits for each author: " >> stats.txt  
git shortlog --numbered --summary --no-merges >> stats.txt

authorInfo=$(git log --pretty="%an" | sort | uniq)
authors=$(echo "$authorInfo" | cut -d ' ' -f 1)
# echo "$authors"

for author in $authors
do
    echo -e "\nAuthor: $author" >> stats.txt  
    echo "Number of lines" >> stats.txt 
    echo "Added | Deleted | File  Modified" >> stats.txt 
    stats=$(git log --author="$author" --pretty=tformat: --numstat | grep -v '^-')
    echo "${stats}" >> stats.txt 
    echo "Total:" >> stats.txt 
    git log --author="$author" --pretty=tformat: --numstat | grep -v '^-' | awk '{ add+=$1; remove+=$2 } END { print add, remove }' >> stats.txt 
 
    echo -e "\nList of unique files modified by $author: " >> stats.txt 
    modifiedFiles=()
	# regex for number
	re='^[0-9]+$'
	for s in $stats
	do
		# check if s is not a number, ends in java and is not already in list modifiedFiles
		if ! [[ $s =~ $re ]] && [[ "${s##*.}" == "$lang" ]] && [[ ! " ${modifiedFiles[@]} " =~ " ${s} " ]]; then
			modifiedFiles+=( "$s" )
		fi
	done

	# echo "${modifiedFiles[@]}"
	printf '%s\n' "${modifiedFiles[@]}" >> stats.txt 
done
