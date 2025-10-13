from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)
DATA_FILE = 'campaigns.json'

# Ensure JSON file exists
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, 'w') as f:
        json.dump([], f)

def load_campaigns():
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_campaigns(campaigns):
    with open(DATA_FILE, 'w') as f:
        json.dump(campaigns, f, indent=4)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/campaigns', methods=['GET', 'POST'])
def campaigns():
    campaigns = load_campaigns()
    if request.method == 'POST':
        data = request.get_json()
        campaigns.append(data)
        save_campaigns(campaigns)
        return jsonify({"success": True})
    return jsonify(campaigns)

@app.route('/api/campaigns/<int:index>', methods=['PUT', 'DELETE'])
def update_delete_campaign(index):
    campaigns = load_campaigns()
    if request.method == 'PUT':
        data = request.get_json()
        campaigns[index] = data
        save_campaigns(campaigns)
        return jsonify({"success": True})
    elif request.method == 'DELETE':
        campaigns.pop(index)
        save_campaigns(campaigns)
        return jsonify({"success": True})

if __name__ == '__main__':
    app.run(debug=True)
