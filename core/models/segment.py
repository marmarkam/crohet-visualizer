from core.models import Stitch
class Segment:
    '''
    Segment: ordered lists of stitches that comprise a round.
        -can represent either a single-pass section or a repeated block line like [sc, inc] x 6

    '''
    def __init__(self, stitches: list[Stitch], repeats: int = 1):
        self.stitches = stitches #stitch pattern for one pass
        self.repeats = repeats # how many times it executes

    @property
    def expanded_stitches(self) -> list[Stitch]:
        #return whole flattened sequence
        return self.stitches * self.repeats
    
    @property
    def stitch_count(self) -> int:
        return sum(s.stitches_produced for s in self.expanded_stitches)
    
    @property
    def stitches_consumed(self) -> int:
        return sum(s.stitches_consumed for s in self.expanded_stitches)
    
    @property
    def symbols(self) -> list[str]:
        '''visual symbols for every stitch in this segment expanded'''
        return [s.symbol for s in self.expanded_stitches]