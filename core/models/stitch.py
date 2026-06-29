class Stitch:
    '''
    Smallest unit of crochet pattern
    Represents a single crochet stitch event.
    inc is one event producing 2 stitches, renderes as V.
    dec consumes two stitches, produces one, rendered as A.
    '''

    STITCH_TYPES = {
        "sc": {"symbol": "+", "color": "white", "produced": 1, "consumed": 1},
        "inc": {"symbol": "V", "color": "green", "produced": 2, "consumed": 1},
        "dec": {"symbol": "A", "color": "red", "produced": 1, "consumed": 2},
    }

    def __init__(self, stitch_type: str, is_round_start: bool = False):
        if stitch_type not in self.STITCH_TYPES:
            raise ValueError(f"Unknown stitch type: {self.stitch_type}")
        self.type = stitch_type
        self.is_round_start = is_round_start #renders as makred stitched

    @property
    def stitches_consumed(self) -> int:
        '''how many stitches from previous round this uses'''
        return self.STITCH_TYPES[self.type]["consumed"]
    
    @property
    def stitches_produced(self) -> int:
        return self.STITCH_TYPES[self.type]["produced"]

    
    @property
    def symbol(self) -> str:
        '''visual rep for 2d rendering'''
        return self.STITCH_TYPES[self.type]["symbol"]
    
    @property
    def color(self) -> str:
        if self.is_round_start: return "yellow"
        return self.STITCH_TYPES[self.type]["color"]

