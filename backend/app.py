# flask-backend-setup.py -> backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Load data from JSON file
def load_data():
    with open('data.json', 'r') as file:
        return json.load(file)

# Save data to JSON file
def save_data(data):
    with open('data.json', 'w') as file:
        json.dump(data, file, indent=2)

# API routes
@app.route('/topics', methods=['GET'])
def get_topics():
    data = load_data()
    return jsonify(data['topics'])

@app.route('/topics', methods=['POST'])
def add_topic():
    data = load_data()
    new_topic = request.json
    new_topic['id'] = str(len(data['topics']) + 1)
    new_topic['subtopics'] = []
    data['topics'].append(new_topic)
    save_data(data)
    return jsonify(new_topic), 201

if __name__ == '__main__':
    app.run(debug=True)
