class ScreeningAgent:

    sanctions = [
        "John Smith",
        "Mohammed Ali",
        "Global Trading"
    ]

    def run(self, name):

        if not name:
            return False

        print("SCREENING:", name)

        return any(
            name.strip().lower() ==
            sanction.strip().lower()
            for sanction in self.sanctions
        )