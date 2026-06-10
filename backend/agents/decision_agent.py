class DecisionAgent:

    def run(self, score):

        if score < 30:
            return "APPROVED"

        elif score < 70:
            return "REVIEW"

        return "REJECTED"