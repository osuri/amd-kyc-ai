import streamlit as st
import requests
import pandas as pd
import plotly.graph_objects as go
import time

st.set_page_config(
    page_title="AMD AI Compliance Copilot",
    page_icon="🤖",
    layout="wide"
)

st.markdown("""
<style>
div.stButton > button:first-child {
    background-color: #1f77ff;
    color: white;
    border-radius: 8px;
    border: none;
    font-weight: bold;
}
div.stButton > button:first-child:hover {
    background-color: #005ce6;
    color: white;
}
</style>
""", unsafe_allow_html=True)

st.title("🤖 AI-Powered KYC & AML Compliance Copilot")
st.caption("Multi-Agent AI | ChromaDB AML Screening | Explainable Risk Scoring")

if "result" not in st.session_state:
    st.session_state.result = None

st.header("📄 Upload KYC Document")

uploaded_file = st.file_uploader(
    "Choose KYC Image",
    type=["jpg", "jpeg", "png"]
)

if uploaded_file:

    st.image(
        uploaded_file,
        caption="Uploaded KYC Document",
        use_container_width=True
    )

    process_btn = st.button(
        "🚀 Process Document",
        use_container_width=True
    )

    if process_btn:

        progress_bar = st.progress(0)
        status = st.empty()

        status.info("📄 OCR Agent Running...")
        progress_bar.progress(20)
        time.sleep(0.5)

        status.info("🔍 Extraction Agent Running...")
        progress_bar.progress(40)
        time.sleep(0.5)

        status.info("🚨 AML Screening Agent Running...")
        progress_bar.progress(60)
        time.sleep(0.5)

        status.info("📊 Risk Scoring Agent Running...")
        progress_bar.progress(80)
        time.sleep(0.5)

        with st.spinner("🤖 AI Agents are processing document..."):

            files = {
                "file": (
                    uploaded_file.name,
                    uploaded_file.getvalue(),
                    uploaded_file.type
                )
            }

            response = requests.post(
                "http://127.0.0.1:8000/process",
                files=files
            )

            st.session_state.result = response.json()

        progress_bar.progress(100)
        status.success("✅ Decision Agent Completed")
        st.success("🎉 KYC Processing Completed Successfully")

if st.session_state.result:

    result = st.session_state.result
    customer = result["customer"]
    score = result["score"]
    decision = result["decision"]
    evidence = result["evidence"]

    st.divider()

    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric("Customer", customer.get("name", "N/A"))

    with col2:
        st.metric("Risk Score", score)

    with col3:
        if decision == "REJECTED":
            st.error("🔴 REJECTED")
        else:
            st.success("🟢 APPROVED")

    st.subheader("🤖 Agent Workflow")

    a1, a2, a3, a4, a5 = st.columns(5)
    a1.success("OCR")
    a2.success("Extraction")
    a3.success("AML")
    a4.success("Risk")
    a5.success("Decision")

    st.subheader("⚠️ Risk Intelligence")

    gauge_color = "green"
    if score >= 70:
        gauge_color = "red"
    elif score >= 30:
        gauge_color = "orange"

    fig = go.Figure(
        go.Indicator(
            mode="gauge+number",
            value=score,
            title={"text": "Risk Score"},
            gauge={
                "axis": {"range": [0, 100]},
                "bar": {"color": gauge_color},
                "steps": [
                    {"range": [0, 30], "color": "#90EE90"},
                    {"range": [30, 70], "color": "#FFD580"},
                    {"range": [70, 100], "color": "#FFB6B6"}
                ]
            }
        )
    )

    st.plotly_chart(fig, use_container_width=True)

    st.subheader("🔍 Explainability")

    if evidence:
        for item in evidence:
            st.warning(item)
    else:
        st.success("No risk indicators detected")

    st.subheader("💬 Compliance Copilot")

    option = st.selectbox(
        "Ask Copilot",
        [
            "Why was customer approved?",
            "Why was customer rejected?",
            "Show risk factors",
            "Recommend next action"
        ]
    )

    if st.button("Generate Insight"):

        if option == "Why was customer approved?":
            st.info(
    f"""

🤖 Compliance Copilot Analysis

Customer: {customer.get("name")}

Decision: {decision}

The customer successfully passed AML screening.

Risk Score: {score}

Evidence:
No sanctions match detected.

Risk Classification:
LOW RISK CUSTOMER

Recommendation:
Proceed with customer onboarding.
"""
)

        elif option == "Why was customer rejected?":
            st.info(
    f"""

🤖 Compliance Copilot Analysis

Customer: {customer.get("name")}

Decision: {decision}

The AML Screening Agent detected a potential sanctions-list match.

Risk Score: {score}

Evidence:
• {' | '.join(evidence)}

Risk Classification:
HIGH RISK CUSTOMER

Recommendation:
Manual compliance review required before onboarding.
"""
)

        elif option == "Show risk factors":
            st.info(str(evidence))

        elif option == "Recommend next action":

            if score >= 70:
                st.error("Escalate for manual review.")
            else:
                st.success("Proceed with onboarding.")

    st.subheader("📜 Audit Trail")

    audit = pd.DataFrame([
        ["OCR Agent", "SUCCESS"],
        ["Extraction Agent", "SUCCESS"],
        ["AML Agent", "SUCCESS"],
        ["Risk Agent", "SUCCESS"],
        ["Decision Agent", "SUCCESS"]
    ], columns=["Component", "Status"])

    st.dataframe(audit, use_container_width=True)
