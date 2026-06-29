from core.models import Round

class Pattern:
    '''
    Pattern holds an ordered list of Round objects
    Can add a round
    '''

    def __init__(self, name: str):
        self.name = name
        self.rounds: list[Round] = [] #starts empty list

    @property
    def number_of_rounds(self) -> int:
        return len(self.rounds)

    @property
    def total_stitch_count(self) -> int:
        return sum(r.stitch_count for r in self.rounds)
    
    def add_round(self, round: Round) -> None:
        self.rounds.append(round)

    def get_round(self, round_number: int) -> Round:
        try:
            return self.rounds[round_number-1]
        except(IndexError, TypeError):
            raise ValueError(f"Invalid round number: {round_number}")
            
    
    def validate(self) -> list[str]:
        errors = []
        for i in range(1, len(self.rounds)):
            previous = self.rounds[i-1]
            current = self.rounds[i]
            if current.stitches_consumed != previous.stitch_count:
                errors.append(
                    f"Round {current.round_number} consumes {current.stitches_consumed} "
                    f"stitches but round {previous.round_number} only produced {previous.stitch_count}"
                )
        return errors
        