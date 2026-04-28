import pandas as pd

def load_data():
    df = pd.read_csv("creditcard.csv")
    return df