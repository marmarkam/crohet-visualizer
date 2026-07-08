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

// //add round button
// document.addEventListener('DOMContentLoaded', function () {
//     document.addEventListener('click', function(e) {
//         if (e.target.id === 'add-round-btn') {
//         e.preventDefault();
//         //clone round elements
//         const originalRound = document.querySelector('.round')
//         const newRound = originalRound.cloneNode(true);

//         //update round counter
//         const roundCount = document.querySelectorAll('.round').length;
//         const newRoundNumber = roundCount + 1;
        
//         const addRoundBtn = document.getElementById('add-round-btn');
//         addRoundBtn.parentNode.insertBefore(newRound, addRoundBtn);

//         //remove round button
//         const removeRoundBtn = document.getElementById('remove-round-btn');

//         }

//         if (e.target.id === 'remove-round-btn') {
//             e.preventDefault();
//             e.target.closest('.round').remove();
//             renumberRounds();
//         }

//         newRound.dataset.round = newRoundNumber;
//         newRound.querySelector('.round-number').textContent = newRoundNumber + '.';

//         //clear inputs
//         newRound.querySelectorAll('input').forEach(input => {
//             input.value = input.type === 'number' ? 1 : '';
//         })
//     });
// });
    
