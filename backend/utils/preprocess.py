# =========================
# backend/utils/preprocess.py
# =========================
import pandas as pd

def clean_data(df):
    df.fillna(0, inplace=True)
    return df