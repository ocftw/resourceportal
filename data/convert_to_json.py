import json
from ODSReader import ODSReader  # renamed the file to odftoarray.py

r = ODSReader("data.ods")
arrays = r.getSheet("Sheet1")
json.dumps(arrays)
