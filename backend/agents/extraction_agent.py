from PIL import Image
import easyocr
import re

reader = easyocr.Reader(['en'])

class ExtractionAgent:

    def run(self, image_path):

        result = reader.readtext(image_path)

        text = " ".join(
            [r[1] for r in result]
        )

        customer = {}

        name_match = re.search(
            r'Name[: ]+([A-Za-z ]+)',
            text
        )

        pan_match = re.search(
            r'([A-Z]{5}[0-9]{4}[A-Z])',
            text.upper()
        )

        customer["name"] = (
            name_match.group(1)
            if name_match else None
        )

        customer["pan"] = (
            pan_match.group(1)
            if pan_match else None
        )

        return customer