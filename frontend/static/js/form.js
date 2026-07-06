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
            newSegment.className = document.getElementsByClassName('segment-input');
            newSegment.placeholder = "sc 6";

            var newRepeat = document.createElement('input');
            newRepeat.type = "number";
            newRepeat.className = document.getElementsByClassName('repeat-input');
            newRepeat.value = 1

            var newSegmentBtn = document.createElement('button');
            newSegmentBtn.textContent = "+";
            newSegmentBtn.className = 'add-segment-btn';

            segmentsDiv.appendChild(newSegment);
            segmentsDiv.appendChild(newRepeat);
            segmentsDiv.appendChild(newSegmentBtn)

        }
    })
})

//add round button
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function(e) {
        if (e.target.id === 'add-round-btn') {
        e.preventDefault();
        //clone round elements
        const originalRound = document.querySelector('.round')
        const newRound = originalRound.cloneNode(true);

        //update round counter
        const roundCount = document.querySelectorAll('.round').length;
        const newRoundNumber = roundCount + 1;
        
        const addRoundBtn = document.getElementById('add-round-btn');
        addRoundBtn.parentNode.insertBefore(newRound, addRoundBtn);

        newRound.dataset.round = newRoundNumber;
        newRound.querySelector('.round-number').textContent = newRoundNumber + '.';

        //clear inputs
        newRound.querySelectorAll('input').forEach(input => {
            input.value = input.type === 'number' ? 1 : '';
        });
        }

    })
    
})