class Stitch:
    '''Smallest unit of crochet pattern'''

    def __init__(self, stitch_type: str, is_round_start: bool = False):
        self.type = stitch_type #sc, inc, dec
        self.is_round_start = is_round_start #renders as makred stitched

    @property
    def stitches_consumed(self) -> int:
        '''how many stitches from previous round this uses'''
        if self.type == "dec": return 2
        return 1
    
    @property
    def stitches_produced(self) -> int:
        '''how many stitches this creates'''
        if self.type == "inc": return 2
        return 1
    
    @property
    def symbol(self) -> str:
        '''visual rep for 2d rendering'''
        symbols = {"sc" : "+", "inc" : "V", "dec" : "A"}
        return symbols.get(self.type, "?")