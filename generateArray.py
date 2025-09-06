import os
import json
import pyperclip

target_dir = "./txt"

files = [f.split(".txt")[0].replace('_', ' - ').replace('$', '/').title().replace('Ver 2', '(ver 2)') for f in os.listdir(target_dir) if os.path.isfile(os.path.join(target_dir, f))]
js_array = json.dumps(files, indent=2)

pyperclip.copy(js_array)

print("✅ File array copied to clipboard!")
