#features as per subscription model tier
FEATURES = {
    "basic": {
        "supported_stitches": {"sc", "inc", "dec"},
        "magic_ring": True,
        "continuous_rounds": True,
    },
    "standard": {
        "supported_stitches": {"sc", "inc", "dec", "hdc", "dc","sl"},
        "joined_rounds": True,
        "stitch_skipping": "True",
    },
    "pro": {
        "supported_stitches": {"sc", "inc", "dec", "hdc", "dc","sl", "ch"},
        "chained_joins": True,
        "oval_starts": True,
        "complex_shaping": True,
    },

}

def get_supported_stitches(tier:str) -> set:
    return FEATURES.get(tier, FEATURES["basic"])["supported_stitches"]