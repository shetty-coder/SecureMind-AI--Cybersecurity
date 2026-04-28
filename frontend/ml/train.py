from preprocess import load_data
import lightgbm as lgb
import joblib

df = load_data()

X = df.drop("Class", axis=1)
y = df["Class"]

model = lgb.LGBMClassifier(class_weight='balanced', verbose=-1)
model.fit(X, y)

joblib.dump(model, "model/lightgbm_model.pkl")