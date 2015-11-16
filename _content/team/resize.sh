#! bash
for i in *.jpg; do
echo $i
convert $i -resize 200x200 $i
done
