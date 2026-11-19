import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = "openai/gpt-oss-120b"

def check_symptoms(symptoms: str) -> str:
    prompt = f"""
You are a cautious medical triage assistant for an educational app called HealthOne.
The user reports: {symptoms}

Provide:
1. Possible conditions (list 2-4, with a short description each).
2. Urgency level (Emergency / Urgent / Non-urgent) and why.
3. Recommended next steps (e.g., see a doctor, rest, hydration).
4. A strong disclaimer that this is NOT a diagnosis.

Be concise. Use plain English. Never prescribe medication.
"""
    chat = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model=MODEL,
        temperature=0.3,
    )
    return chat.choices[0].message.content

def summarize_report(report_text: str) -> str:
    prompt = f"""
You are a medical report explainer for patients.
Here is a medical report text:
---
{report_text[:6000]}
---

Write a plain‑English summary that:
- Explains any abnormal values in simple terms.
- Suggests questions the patient could ask their doctor.
- Does NOT give a diagnosis or treatment plan.
- Includes a disclaimer that this is for education only.
Keep it under 300 words.
"""
    chat = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model=MODEL,
        temperature=0.3,
    )
    return chat.choices[0].message.content

def get_recommendations(profile: dict) -> str:
    prompt = f"""
You are a wellness coach for an educational health app.
User profile: {profile}

Generate personalised health recommendations covering:
- Diet suggestions (general, non‑prescriptive).
- Exercise ideas appropriate for their activity level.
- Preventive screenings they might discuss with a doctor.
- Lifestyle tips.
Always include a disclaimer that this is not medical advice.
"""
    chat = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model=MODEL,
        temperature=0.4,
    )
    return chat.choices[0].message.content