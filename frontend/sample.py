# Upload & Process Section

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
    type="primary",
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

    with st.spinner(
        "🤖 AI Agents are processing document..."
    ):

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

    status.success(
        "✅ Decision Agent Completed"
    )

    st.success(
        "🎉 KYC Processing Completed Successfully"
    )

