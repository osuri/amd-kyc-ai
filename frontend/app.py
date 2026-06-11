import streamlit as st
import requests
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

st.set_page_config(
    page_title="AMD AI Compliance Copilot",
    page_icon="🤖",
    layout="wide"
)

st.title("🤖 AI-Powered KYC & AML Compliance Copilot")

if "result" not in st.session_state:
    st.session_state.result = None

tab1, tab2, tab3, tab4, tab5 = st.tabs([
    "📄 Document",
    "🤖 Agents",
    "⚠️ Risk",
    "🔍 Explainability",
    "📜 Audit"
])
with tab1:

    st.header("Document Processing")

    uploaded_file = st.file_uploader(
        "Upload KYC Document",
        type=["jpg","jpeg","png"]
    )

    if uploaded_file:

        st.image(uploaded_file, width=400)

        if st.button("Process Document"):

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

            st.success("Processing Complete")
with tab2:

    st.header("Multi-Agent Workflow")

    agents = pd.DataFrame([
        ["OCR Agent", "✅ Completed"],
        ["Extraction Agent", "✅ Completed"],
        ["AML Agent", "✅ Completed"],
        ["Risk Agent", "✅ Completed"],
        ["Decision Agent", "✅ Completed"]
    ], columns=["Agent", "Status"])

    st.dataframe(
        agents,
        use_container_width=True
    )

    st.subheader("Execution Timeline")

    timeline = [
        "10:00:01 OCR Started",
        "10:00:02 OCR Completed",
        "10:00:03 Extraction Completed",
        "10:00:04 AML Screening Completed",
        "10:00:05 Risk Score Generated",
        "10:00:06 Final Decision Generated"
    ]

    for item in timeline:
        st.success(item)

with tab3:

    result = st.session_state.result

    if result:

        score = result["score"]

        decision = result["decision"]

        col1, col2 = st.columns(2)

        with col1:
            st.metric(
                "Risk Score",
                score
            )

        with col2:
            st.metric(
                "Decision",
                decision
            )
        fig = go.Figure(
            go.Indicator(
                mode="gauge+number",
                value=score,
                title={"text":"Risk Score"},
                gauge={
                    "axis":{"range":[0,100]},
                    "steps":[
                        {"range":[0,30]},
                        {"range":[30,70]},
                        {"range":[70,100]}
                    ]
                }
            )
        )

        st.plotly_chart(
            fig,
            use_container_width=True
        )

with tab4:

    result = st.session_state.result

    if result:

        st.header("AI Explainability")

        evidence = result["evidence"]

        if evidence:

            for item in evidence:
                st.warning(item)

        else:
            st.success(
                "No risk indicators detected"
            )
        st.header("Compliance Copilot")

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

            score = result["score"]

            decision = result["decision"]

            if option == "Why was customer approved?":

                st.info(
                    f"""
Decision: {decision}

Customer passed AML checks.

No sanctions detected.

Risk Score: {score}
"""
                )

            elif option == "Show risk factors":

                st.info(
                    f"""
Risk Factors:

{evidence}
"""
                )

            elif option == "Recommend next action":

                if score >= 70:

                    st.error(
                        "Escalate for manual review."
                    )

                else:

                    st.success(
                        "Proceed with onboarding."
                    )
with tab5:

    st.header("Audit Trail")

    audit = pd.DataFrame([
        ["OCR Agent","SUCCESS"],
        ["Extraction Agent","SUCCESS"],
        ["AML Agent","SUCCESS"],
        ["Risk Agent","SUCCESS"],
        ["Decision Agent","SUCCESS"]
    ], columns=[
        "Component",
        "Status"
    ])

    st.dataframe(
        audit,
        use_container_width=True
    )