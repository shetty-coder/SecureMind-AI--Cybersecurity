import joblib
import numpy as np
import warnings

warnings.filterwarnings('ignore')

# load trained model
model = joblib.load("model/lightgbm_model.pkl")

def predict_transaction(input_data):
    """
    input_data = list of 30 features (same as dataset without 'Class')
    """
    input_array = np.array(input_data).reshape(1, -1)
    
    prediction = model.predict(input_array)[0]
    probability = model.predict_proba(input_array)[0][1]

    return {
        "prediction": int(prediction),  # 0 = normal, 1 = fraud
        "fraud_probability": float(probability)
    }


# test manually
if __name__ == "__main__":
    sample = [0]*30  # replace with real values
    result = predict_transaction(sample)
    print(result)