#!/bin/bash

# params to change
lang="java" #primary language extention used in repo

echo "Number of commits for each author: " > stats.txt  
git shortlog --numbered --summary --no-merges >> stats.txt 

authorInfo=$(git log --pretty="%an" | sort | uniq)
authors=$(echo "$authorInfo" | cut -d ' ' -f 1)
# echo "$authors"

for author in $authors
do
    echo -e "\nAuthor: $author" >> stats.txt  
    echo "Number of lines" >> stats.txt 
    echo "Added | Deleted | File  Modified" >> stats.txt 
    stats=$(git log --author="q6y0b" --pretty=tformat: --numstat | grep -v '^-')
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

    echo -e "\nAuthor: $author"
    echo "Number of lines"
    echo "Added | Deleted | File  Modified"
    stats=$(git log --author="q6y0b" --pretty=tformat: --numstat | grep -v '^-')
    echo "${stats}"
    echo "Total:"
    git log --author="$author" --pretty=tformat: --numstat | grep -v '^-' | awk '{ add+=$1; remove+=$2 } END { print add, remove }' 

    echo -e "\nList of unique files modified by $author: "
    modifiedFiles=()
	# regex for number
	re='^[0-9]+$'
	for s in $stats
	do
		# check if s is not a number, ends in java and is not already in list modifiedFiles
		if ! [[ $s =~ $re ]] && [[ "${s##*.}" == "java" ]] && [[ ! " ${modifiedFiles[@]} " =~ " ${s} " ]]; then
			modifiedFiles+=( "$s" )
		fi
	done

	echo "${modifiedFiles[@]}"


done

codeFiles=$(find . -name "*.java")
echo -e "\nAll the code files: " >> stats.txt 
echo "$codeFiles" >> stats.txt 


