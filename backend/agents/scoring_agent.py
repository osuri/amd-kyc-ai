class ScoringAgent:

    def run(self, customer, aml_match):

        score = 0

        evidence = []

        if aml_match:

            score += 80

            evidence.append(
                "AML Match"
            )

        if not customer.get("pan"):

            score += 20

            evidence.append(
                "PAN Missing"
            )

        return score, evidence