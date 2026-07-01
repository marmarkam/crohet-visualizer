import math

#placeholder until real measurement is taken
#worsted weight (4) yarn, D hook (3.25mm), single crochet
STITCH_HEIGHT_CM = .6 #TODO: replace with measured value

#fills in a dictionary of rounds, containing each rounds' radius, height, and stitch count
def compute_geometry(pattern) -> dict:
    rounds_geometry = []

    for round_number in range(1, pattern.number_of_rounds + 1):
        round_obj = pattern.get_round(round_number)
        radius = round_obj.stitch_count / (2 * math.pi)
        height = round_number * STITCH_HEIGHT_CM

        rounds_geometry.append({
            "round_number": round_number,
            "stitch_count": round_obj.stitch_count,
            "radius": radius,
            "height": height,
        })

    return {"rounds": rounds_geometry}