import joblib
import warnings
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score
from preprocess import load_data

warnings.filterwarnings('ignore')

# load data
df = load_data()

X = df.drop("Class", axis=1)
y = df["Class"]

# split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# load model
model = joblib.load("model/lightgbm_model.pkl")

# predictions
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]

# metrics
print("Accuracy:", accuracy_score(y_test, y_pred))
print("ROC-AUC:", roc_auc_score(y_test, y_prob))

print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))