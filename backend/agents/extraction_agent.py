import easyocr
import re

reader = easyocr.Reader(['en'])

class ExtractionAgent:

    def run(self, image_path):

        result = reader.readtext(image_path)

        text = " ".join([r[1] for r in result])

        print("OCR TEXT:", text)

        customer = {}

        # Extract PAN
        pan_match = re.search(
            r'([A-Z]{5}[0-9]{4}[A-Z])',
            text.upper()
        )

        customer["pan"] = (
            pan_match.group(1)
            if pan_match else None
        )

        # Extract Name
        name_match = re.search(
            r'Name[: ]+([A-Za-z ]+?)(?:PAN|DOB|Address|$)',
            text,
            re.IGNORECASE
        )

        customer["name"] = (
            name_match.group(1).strip()
            if name_match else None
        )

        print("CUSTOMER:", customer)

        return customer