import json, csv
#from ODSReader import ODSReader  # renamed the file to odftoarray.py

docs = []
"""
r = ODSReader("data.ods")
arrays = r.getSheet("Sheet1")
for row in arrays:
    docs.append(dict(zip(arrays[0], row)))
with open('materials.json', 'w') as outfile:
    json.dump(docs, outfile, indent=2, sort_keys=True)
print(docs)
"""

with open('data.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        docs.append(row)
    with open('materials.js', 'w') as outfile:
        json.dump(docs, outfile, indent=2, sort_keys=True)
