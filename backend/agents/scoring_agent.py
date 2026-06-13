class ScoringAgent:

    def run(self, customer, aml_match):

        score = 0

        evidence = []

        has_aml_match = (
            aml_match.get("match")
            if isinstance(aml_match, dict)
            else aml_match
        )

        if has_aml_match:

            score += 80

            metadata = (
                aml_match.get("metadata") or {}
                if isinstance(aml_match, dict)
                else {}
            )
            risk_category = metadata.get("risk_category", "AML")

            evidence.append(
                f"AML Match ({risk_category})"
            )

        if not customer.get("pan"):

            score += 20

            evidence.append(
                "PAN Missing"
            )

        return score, evidence
