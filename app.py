import streamlit as st
import joblib

# Load model and vectorizer
model = joblib.load("xgb_mental_health_model.joblib")
vectorizer = joblib.load("tfidf_vectorizer.joblib")

st.title("Depression Detection System")

user_input = st.text_area("Enter your text here:")

if st.button("Predict"):
    if user_input.strip() != "":
        transformed = vectorizer.transform([user_input])
        prediction = model.predict(transformed)[0]

        if prediction == 1:
            st.error("Depression Detected")
        else:
            st.success("No Depression Detected")
