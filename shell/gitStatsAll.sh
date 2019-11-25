#!/bin/bash
# Usage: ./gitallStats.sh <stats.txt>
outputName="$1"

# echo "$outputName"
# params to change
currentBranch="master" #primary language extention used in repo
echo -e "\nNumber of commits for each author: " > "$outputName"
git shortlog HEAD --numbered --summary --no-merges >> "$outputName"

codeFiles=$(git ls-tree -r "$currentBranch" --name-only)
echo -e "\nAll the code files: " >> "$outputName"
echo "$codeFiles" >> "$outputName"


authorInfo=$(git log --pretty="%an" | sort | uniq)
authors=$(echo "$authorInfo" | cut -d ' ' -f 1)
# echo "$authors"

for author in $authors
do
    echo -e "\nAuthor: $author" >> "$outputName"
    # echo "Number of lines" >> "$outputName"
    # echo "Added | Deleted | File  Modified" >> "$outputName"
    allStats=$(git log --author="$author" --pretty=tformat: --numstat | grep -v '^-')
    echo "${allStats}" >> "$outputName"
    echo "Total:" >> "$outputName"
    git log --author="$author" --pretty=tformat: --numstat | grep -v '^-' | awk '{ add+=$1; remove+=$2 } END { print add, remove }' >> "$outputName"

    # echo -e "\nList of unique files modified by $author: " >> "$outputName"
    # modifiedFiles=()
	# # regex for number
	# re='^[0-9]+$'
	# for s in $allStats
	# do
	# 	# check if s is not a number, ends in java and is not already in list modifiedFiles
	# 	if ! [[ $s =~ $re ]] && [[ "${s##*.}" == "$lang" ]] && [[ ! " ${modifiedFiles[@]} " =~ " ${s} " ]]; then
	# 		modifiedFiles+=( "$s" )
	# 	fi
	# done

	# echo "${modifiedFiles[@]}"
	# printf '%s\n' "${modifiedFiles[@]}" >> "$outputName"
done
