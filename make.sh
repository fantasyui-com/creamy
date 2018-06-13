cp creamy-blank.json creamy.json;
for f in library/*.png; do
  echo "Processing $f file..";
  ./cli.js --generate --file $f > creamy.json.tmp; mv creamy.json.tmp creamy.json ;
done
./cli.js > creamy.css
