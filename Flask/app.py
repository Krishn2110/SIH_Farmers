# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib
# import numpy as np
# import warnings
# warnings.filterwarnings("ignore", category=UserWarning)

# app = Flask(__name__)
# CORS(app)

# # ✅ Load ML model safely with joblib
# model_data = joblib.load("crop_recommendation_model.pkl")
# model = model_data['model']
# label_encoder = model_data['label_encoder']
# features_list = model_data['features']

# @app.route("/")
# def home():
#     return "✅ Flask ML API is running!"

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.json
        
#         # Extract parameters from React frontend
#         nitrogen = float(data.get("nitrogen", 0))
#         phosphorous = float(data.get("phosphorous", 0))  # P
#         phosphorus = float(data.get("phosphorus", 0))    # K
#         temperature = float(data.get("temperature", 0))
#         humidity = float(data.get("humidity", 0))
#         soilPh = float(data.get("soilPh", 0))
#         rainfall = float(data.get("rainfall", 0))
        
#         # Map soil type to numeric value
#         soil_type_mapping = {
#             'Clay': 0,
#             'Sandy': 1,
#             'Loam': 2,
#             'Silt': 3
#         }
#         soil_type = soil_type_mapping.get(data.get("soilType", "Loam"), 2)
        
#         # Map previous crop to numeric value
#         crop_mapping = {
#             'Wheat': 0,
#             'Rice': 1,
#             'Corn': 2,
#             'Soybean': 3,
#             'Cotton': 4
#         }
#         previous_crop = crop_mapping.get(data.get("previousCrop", "Wheat"), 0)
        
#         # Get previous yield
#         previous_yield = float(data.get("previousYield", 0))

#         # ✅ Arrange features in the same order as training
#         # Model expects only 7 features: [N, P, K, temperature, humidity, ph, rainfall]
#         features = np.array([[nitrogen, phosphorous, phosphorus, temperature, humidity, soilPh, rainfall]])
        
#         # Make prediction
#         prediction_encoded = model.predict(features)[0]
        
#         # Decode the prediction using label encoder
#         prediction = label_encoder.inverse_transform([prediction_encoded])[0]

#         return jsonify({"prediction": str(prediction)})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# if __name__ == "__main__":
#     app.run(debug=True, port=5000)

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import warnings
from huggingface_hub import InferenceClient

warnings.filterwarnings("ignore", category=UserWarning)

app = Flask(__name__)
CORS(app)

# =========================
# 🤖 Hugging Face Chatbot Setup
# =========================
HF_API_KEY = "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"  # 🔑 Replace with your token

client = InferenceClient(
    "mistralai/Mistral-7B-Instruct-v0.2",
    token=HF_API_KEY
)

# Chat history with system farming instruction
chat_history = [
    {"role": "system", "content": "You are an expert farming assistant. "
     "You only answer questions related to agriculture, crops, seeds, soil, fertilizers, "
     "pesticides, weather for farming, and crop yield. If the user asks something unrelated, "
     "politely guide them back to farming topics."}
]

def chat_with_hf(user_input: str) -> str:
    global chat_history
    chat_history.append({"role": "user", "content": user_input})

    response = client.chat.completions.create(
        model="mistralai/Mistral-7B-Instruct-v0.2",
        messages=chat_history,
        max_tokens=200
    )

    bot_reply = response.choices[0].message["content"]
    chat_history.append({"role": "assistant", "content": bot_reply})

    return bot_reply


# =========================
# 🌱 Crop Recommendation ML Setup
# =========================
model_data = joblib.load("crop_recommendation_model.pkl")
model = model_data['model']
label_encoder = model_data['label_encoder']
features_list = model_data['features']

crop_image_mapping = {
    "Apple": "Apple.jpeg",
    "Banana": "Banana.jpeg",
    "Blackgram": "Blackgram.jpeg",
    "ChickPea": "ChickPea.jpeg",
    "Coconut": "Coconut.jpeg",
    "Coffee": "Coffee.jpeg",
    "Cotton": "Cotton.jpeg",
    "Grapes": "Grapes.jpeg",
    "Jute": "Jute.jpeg",
    "KidneyBeans": "KidneyBeans.jpeg",
    "Lentil": "Lentil.jpeg",
    "Maize": "Maize.jpeg",
    "MothBeans": "MothBeans.jpeg",
    "MungBean": "MungBean.jpeg",
    "Muskmelon": "Muskmelon.jpeg",
    "Orange": "Orange.jpeg",
    "Papaya": "Papaya.jpeg",
    "PigeonPeas": "PigeonPeas.jpeg",
    "Pomegranate": "Pomegranate.jpeg",
    "Rice": "Rice.jpeg",
    "Watermelon": "Watermelon.jpeg",
}



# =========================
# 🌐 Routes
# =========================
@app.route("/")
def home():
    return "✅ Flask Farming API is running!"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        
        nitrogen = float(data.get("nitrogen", 0))
        phosphorous = float(data.get("phosphorous", 0))  # P
        phosphorus = float(data.get("phosphorus", 0))    # K
        temperature = float(data.get("temperature", 0))
        humidity = float(data.get("humidity", 0))
        soilPh = float(data.get("soilPh", 0))
        rainfall = float(data.get("rainfall", 0))
        
        # Soil type mapping
        soil_type_mapping = {
            'Clay': 0, 'Sandy': 1, 'Loam': 2, 'Silt': 3
        }
        soil_type = soil_type_mapping.get(data.get("soilType", "Loam"), 2)
        
        # Previous crop mapping
        crop_mapping = {
            'Wheat': 0, 'Rice': 1, 'Corn': 2, 'Soybean': 3, 'Cotton': 4
        }
        previous_crop = crop_mapping.get(data.get("previousCrop", "Wheat"), 0)
        
        previous_yield = float(data.get("previousYield", 0))

        # Arrange features (must match training order)
        features = np.array([[nitrogen, phosphorous, phosphorus, temperature, humidity, soilPh, rainfall]])
        
        prediction_encoded = model.predict(features)[0]
        prediction = label_encoder.inverse_transform([prediction_encoded])[0]

        # ✅ Add image path if available
        image_file = crop_image_mapping.get(prediction, None)

        return jsonify({
            "prediction": str(prediction),
            "image": f"/assets/photos-crop/{image_file}" if image_file else None
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        user_message = data.get("message", "")

        if not user_message:
            return jsonify({"error": "Message is required"}), 400

        reply = chat_with_hf(user_message)
        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# 🚀 Run App
# =========================
if __name__ == "__main__":
    app.run(debug=True, port=5000)
