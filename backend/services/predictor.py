import joblib
import pandas as pd

# load ML model
model = joblib.load("../frontend/ml/model/lightgbm_model.pkl")

def predict_intrusion(data):
    try:
        df = pd.DataFrame([data])   # convert input to table
        result = model.predict(df)[0]

        if result == 1:
            return "Attack Detected"
        else:
            return "Normal Traffic"

    except Exception as e:
        return str(e)