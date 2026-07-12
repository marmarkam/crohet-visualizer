//add segment button
document.addEventListener('DOMContentLoaded', function() {
    //handle add segment button clicks
    document.addEventListener('click', function(e){
        if (e.target.classList.contains('add-segment-btn')) {
            e.preventDefault();
            const round = e.target.closest('.round');
            const segmentsDiv = round.querySelector('.segments');
            
            var newSegment = document.createElement('input');
            newSegment.type = 'text';
            newSegment.className = 'segment-input';
            newSegment.placeholder = "sc 6";

            var newRepeat = document.createElement('input');
            newRepeat.type = "number";
            newRepeat.className = 'repeat-input';
            newRepeat.value = 1

            var newSegmentBtn = document.createElement('button');
            newSegmentBtn.textContent = "+";
            newSegmentBtn.className = 'add-segment-btn';
            
            var newSegRemoveBtn = document.createElement('button');
            newSegRemoveBtn.textContent = "-";
            newSegRemoveBtn.className = "remove-segment-btn";

            var newSegmentDiv = document.createElement('div');
            newSegmentDiv.className = 'segment';

            newSegmentDiv.appendChild(newSegment);
            newSegmentDiv.appendChild(newRepeat);
            newSegmentDiv.appendChild(newSegmentBtn);
            newSegmentDiv.appendChild(newSegRemoveBtn);

            segmentsDiv.appendChild(newSegmentDiv);

        }

        //remove segment button
        if(e.target.classList.contains('remove-segment-btn')) {
            e.preventDefault();
            e.target.closest('.segment').remove();
        }

        //add round button
        if (e.target.id === 'add-round-btn') {
            e.preventDefault();
            //clone round elements
            const originalRound = document.querySelector('.round')
            const newRound = originalRound.cloneNode(true);

            //update round counter
            const roundCount = document.querySelectorAll('.round').length;
            const newRoundNumber = roundCount + 1;
            newRound.dataset.round = newRoundNumber;
            newRound.querySelector('.round-number').textContent = newRoundNumber + '.';

            //clear inputs
            newRound.querySelectorAll('input').forEach(input => {
                input.value = input.type === 'number' ? 1 : '';
            });
            
            const addRoundBtn = document.getElementById('add-round-btn');
            addRoundBtn.parentNode.insertBefore(newRound, addRoundBtn);
        }

        //remove round button
        if (e.target.classList.contains('remove-round-btn')) {
            e.preventDefault();
            e.target.closest('.round').remove();
            renumberRounds();
        }

        //collect form data and send to api on enter
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const data = collectPatternData();
                console.log(JSON.stringify(data))
                const name = document.getElementById('pattern-name').value || 'untitled';

                fetch('/api/pattern', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({"name": name, "rounds": data })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })

            }
        })

    });
});

//renumber rounds
function renumberRounds(){
    const rounds = document.querySelectorAll('.round');
    rounds.forEach(function(round, index) {
        round.dataset.round = index + 1;
        round.querySelector('.round-number').textContent = (index + 1) + '.';
    });
}

//colllect form data
function collectPatternData(){
    const roundsData = [];

    //round divs
    const rounds = document.querySelectorAll('.round');
    rounds.forEach(function(round) {
        const roundData = [];

        //get segments for the round
        const segments = round.querySelectorAll('.segment');
        segments.forEach(function(segment) {
            //get raw string and repeat count
            const raw = segment.querySelector('.segment-input').value.trim();
            const repeats = parseInt(segment.querySelector('.repeat-input').value);

            if(raw === '') return;

            //build segment object and push to roundData
            roundData.push({
                "raw": raw,
                "repeats": repeats
            });
        });

        //push this rounds data to outer array
        if(roundData.length > 0) {
            roundsData.push(roundData);
        }
    });

    return roundsData;

}  
