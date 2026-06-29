from core.models import Pattern
from core.parser import parse_round

segments_data = [
    {"raw": "sc 6", "repeats": 1}
]

r1 = parse_round(segments_data, round_number= 1)
print(r1.stitch_count)
print(r1.stitches_consumed)
print([s.symbol for s in r1.all_stitches])

segments_data2 = [
    {"raw": "sc 2, inc", "repeats": 6}
]

r2 = parse_round(segments_data2, round_number=2)
print(r2.stitch_count)
print(r2.stitches_consumed)
print([s.symbol for s in r2.all_stitches])

from core.models import Pattern

p = Pattern("test")
p.add_round(r1)
p.add_round(r2)

errors = p.validate()
if errors:
    for e in errors:
        print(e)
else:
    print("Pattern is valid!")