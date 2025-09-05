from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import warnings
warnings.filterwarnings("ignore", category=UserWarning)

app = Flask(__name__)
CORS(app)

# ✅ Load ML model safely with joblib
model_data = joblib.load("crop_recommendation_model.pkl")
model = model_data['model']
label_encoder = model_data['label_encoder']
features_list = model_data['features']

@app.route("/")
def home():
    return "✅ Flask ML API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        
        # Extract parameters from React frontend
        nitrogen = float(data.get("nitrogen", 0))
        phosphorous = float(data.get("phosphorous", 0))  # P
        phosphorus = float(data.get("phosphorus", 0))    # K
        temperature = float(data.get("temperature", 0))
        humidity = float(data.get("humidity", 0))
        soilPh = float(data.get("soilPh", 0))
        rainfall = float(data.get("rainfall", 0))
        
        # Map soil type to numeric value
        soil_type_mapping = {
            'Clay': 0,
            'Sandy': 1,
            'Loam': 2,
            'Silt': 3
        }
        soil_type = soil_type_mapping.get(data.get("soilType", "Loam"), 2)
        
        # Map previous crop to numeric value
        crop_mapping = {
            'Wheat': 0,
            'Rice': 1,
            'Corn': 2,
            'Soybean': 3,
            'Cotton': 4
        }
        previous_crop = crop_mapping.get(data.get("previousCrop", "Wheat"), 0)
        
        # Get previous yield
        previous_yield = float(data.get("previousYield", 0))

        # ✅ Arrange features in the same order as training
        # Model expects only 7 features: [N, P, K, temperature, humidity, ph, rainfall]
        features = np.array([[nitrogen, phosphorous, phosphorus, temperature, humidity, soilPh, rainfall]])
        
        # Make prediction
        prediction_encoded = model.predict(features)[0]
        
        # Decode the prediction using label encoder
        prediction = label_encoder.inverse_transform([prediction_encoded])[0]

        return jsonify({"prediction": str(prediction)})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)
