import streamlit as st
import requests
import pandas as pd
import plotly.express as px

st.set_page_config(
    page_title="AMD KYC AML Multi-Agent Assistant",
    page_icon="🤖",
    layout="wide"
)

# Session State
if "messages" not in st.session_state:
    st.session_state.messages = []

if "last_result" not in st.session_state:
    st.session_state.last_result = None

# Header
st.title("🤖 AMD KYC AML Multi-Agent Assistant")

st.markdown("""
Upload a KYC document and interact with AI agents to understand
customer risk and compliance decisions.
""")

# Sidebar
st.sidebar.title("Agent Status")

agent_status = pd.DataFrame(
    [
        ["OCR Agent", "Ready"],
        ["Extraction Agent", "Ready"],
        ["AML Agent", "Ready"],
        ["Risk Agent", "Ready"],
        ["Decision Agent", "Ready"]
    ],
    columns=["Agent", "Status"]
)

st.sidebar.dataframe(
    agent_status,
    use_container_width=True
)

# Upload Section
st.header("📄 Upload KYC Document")

uploaded_file = st.file_uploader(
    "Choose Image",
    type=["jpg", "jpeg", "png"]
)

if uploaded_file:

    st.image(
        uploaded_file,
        width=400
    )

    if st.button("🚀 Process Document"):

        with st.spinner("Running AI Agents..."):

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

            result = response.json()

            st.session_state.last_result = result

        st.success("Processing Completed")

# Results Section
if st.session_state.last_result:

    result = st.session_state.last_result

    customer = result["customer"]

    st.header("📋 Customer Details")

    col1, col2 = st.columns(2)

    with col1:

        st.metric(
            "Customer Name",
            customer.get("name", "")
        )

    with col2:

        st.metric(
            "PAN",
            customer.get("pan", "")
        )

    st.header("⚠️ Risk Analysis")

    col1, col2 = st.columns(2)

    with col1:

        st.metric(
            "Risk Score",
            result["score"]
        )

    with col2:

        st.metric(
            "Decision",
            result["decision"]
        )

    # Risk Chart
    fig = px.pie(
        values=[
            result["score"],
            max(0, 100 - result["score"])
        ],
        names=[
            "Risk",
            "Safe"
        ],
        title="Risk Distribution"
    )

    st.plotly_chart(
        fig,
        use_container_width=True
    )

    # Evidence
    st.header("🔍 Evidence")

    evidence = result.get(
        "evidence",
        []
    )

    if evidence:

        for item in evidence:

            st.warning(item)

    else:

        st.success(
            "No Risk Indicators Found"
        )

    # Agent Trace
    st.header("🤖 Agent Execution Trace")

    st.success("✅ OCR Agent Completed")
    st.success("✅ Extraction Agent Completed")
    st.success("✅ AML Agent Completed")
    st.success("✅ Risk Agent Completed")
    st.success("✅ Decision Agent Completed")

# Chatbot Section
st.header("💬 Compliance Assistant")

for msg in st.session_state.messages:

    with st.chat_message(msg["role"]):

        st.write(msg["content"])

prompt = st.chat_input(
    "Ask about customer risk..."
)

if prompt:

    st.session_state.messages.append(
        {
            "role": "user",
            "content": prompt
        }
    )

    with st.chat_message("user"):

        st.write(prompt)

    result = st.session_state.last_result

    if result:

        score = result["score"]

        decision = result["decision"]

        evidence = result["evidence"]

        response = f"""
Decision: {decision}

Risk Score: {score}

Evidence:
{', '.join(evidence) if evidence else 'No evidence found'}

Explanation:
The customer was evaluated using OCR, AML screening,
risk scoring and decision agents.
"""

    else:

        response = """
Please upload and process a document first.
"""

    with st.chat_message("assistant"):

        st.write(response)

    st.session_state.messages.append(
        {
            "role": "assistant",
            "content": response
        }
    )
    