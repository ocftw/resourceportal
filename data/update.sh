wget -O 'data.csv' 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRx4T_7_-dfO4z0jayg2qsmSu5nxBbZuA2pYymrQZP_vTPya8ZKtgDRFae55HGslk_tbSag4yBzXLxX/pub?output=csv'
python convert_to_json.py
echo -n 'window.materials = ' | cat - materials.js > temp && mv temp materials.js
