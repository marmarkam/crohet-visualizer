from flask import Flask, request, jsonify
from core.parser import parse_pattern
from core.geometry import compute_geometry

app = Flask(__name__)

@app.route('/api/pattern', methods=['POST'])
def handle_pattern():
    data = request.get_json()
    if not data or "name" not in data or "rounds" not in data:
        return jsonify({"error": "Invalid request body"}), 400
    
    name = data["name"]
    rounds = data["rounds"]
    
    pattern, errors = parse_pattern(name, rounds)
    
    result = compute_geometry(pattern)
    
    return jsonify({
        "errors": errors,
        "rounds": result["rounds"]
        })

if __name__ == '__main__':
    app.run(debug=True)