from core.models import Pattern, Round, Segment, Stitch
from core.features import get_supported_stitches

'''
Parser will break down input to output segment objects
'''

#constants
SUPPORTED_STITCHES = {"sc", "inc", "dec"}

UNSUPPORTED_STITCHES = {
    "ch": "chaining is not yet supported",
    "sl": "slip stitches are not yet supported",
    "dc": "double crochet is not yet supported",
    "hdc": "half double crochet is not yet supported",
    "sk": "skipping stitches is not yet supported",
}

#magic ring assumption
MAGIC_RING_COUNT = 6 #default starting stitches

def create_magic_ring() -> Round:
    '''
    creates default starting round of 6 sc mr
    all amigurumi parts are assumed to begin this mr
    can be changed by user
    '''
    stitches = [Stitch("sc") for _ in range(MAGIC_RING_COUNT)]
    stitches[0].is_round_start = True
    segment = Segment(stitches, repeats=1)
    return Round([segment], round_number = 1)

#exceptions
class UnsupportedStitchError(Exception):
    pass

#pure string -> stitch objects
def parse_stitch(token: str) -> Stitch:
    if token in UNSUPPORTED_STITCHES:
        raise UnsupportedStitchError(
            f"{UNSUPPORTED_STITCHES[token]}"
        )
    if token not in SUPPORTED_STITCHES:
        raise ValueError(f"'{token}' is not a recognized stitch.")
    return Stitch(token)

#stitch objects in ordered segments
def parse_segment(raw: str, repeats: int) -> Segment:
    instructions = raw.lower().strip().split(",")
    stitches = []
    for instruction in instructions:
        stitch_name = None
        count = 1

        stitch_and_count = instruction.strip().split()
        
        #differentiate between stitch and count
        for token in stitch_and_count:
            if token.isdigit():
                count = int(token)
            else:
                stitch_name = token

        if stitch_name is None:
            raise ValueError(f"No stitch name found in instruction: '{instruction}'")
        
        #append to stitches
        for _ in range (count):
            stitches.append(parse_stitch(stitch_name))
    
    return Segment(stitches, repeats)

#takes an ordered list of segments and returns Round object
def parse_round(segment_data: list[dict], round_number: int) -> Round:
    parsed_segments = []
    
    for segment in segment_data:
        raw = segment["raw"]
        repeats = segment["repeats"]
        segment = parse_segment(raw, repeats)

        parsed_segments.append(segment)

    if not parsed_segments:
        raise ValueError("A round must have at least one segment")

    parsed_segments[0].expanded_stitches[0].is_round_start = True
    
    return Round(parsed_segments, round_number)