class ScreeningAgent:

    sanctions = [
        "John Smith",
        "Mohammed Ali",
        "Global Trading"
    ]

    def run(self, name):

        return any(
            name.lower() ==
            s.lower()
            for s in self.sanctions
        )