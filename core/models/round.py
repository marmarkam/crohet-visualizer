from core.models import Segment, Stitch
class Round:
    '''
    Round: the basic instruction unit for amigurumi
        -in the context of this visualizer, a round is made up of instruction segments
    '''
    
    def __init__(self, segments: list[Segment], round_number: int, start_marked: bool = True):
        self.round_number = round_number
        self.segments = segments
        self.start_marked = start_marked
        self.start_offset = 0 #stitch index where round begins; useful for when rounds don't align clearly

    @property
    def all_stitches(self) -> list[Stitch]:
        results = []
        for segment in self.segments:
            results.extend(segment.expanded_stitches)
        return results
    
    @property
    def stitch_count(self) -> int:
        return sum(seg.stitch_count for seg in self.segments)

    @property
    def stitches_consumed(self) -> int:
        return sum(seg.stitches_consumed for seg in self.segments)
    
    @property
    def symbols(self) -> list[str]:
        '''visual symbols for every stitch in this round expanded'''
        return [s.symbol for s in self.all_stitches]
