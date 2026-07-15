const divider = document.getElementById('divider');
const viewerPanel = document.getElementById('viewer-panel');
const inputPanel = document.getElementById('input-panel');

let isResizing = false;

divider.addEventListener('mousedown', function(e) {
    isResizing = true;
    document.body.style.cursor = 'col-resize';
});

document.addEventListener('mousemove', function(e) {
    if (!isResizing) return;

    const container = document.querySelector('.app-container');
    const containerRect = container.getBoundingClientRect();
    const offset = e.clientX - containerRect.left;
    const totalWidth = containerRect.width;

    //clamp between 20 & 80%
    const percent = Math.min(80, Math.max(20, (offset / totalWidth) * 100));

    viewerPanel.style.flex = 'none';
    viewerPanel.style.width = percent + '%';
    inputPanel.style.flex = '1';

    // window.dispatchEvent(new Event('resize'));
});

document.addEventListener('mouseup', function() {
    if (isResizing) {
        isResizing = false;
        document.body.style.cursor = 'default';
        //notify three.js renderer size has changed
        window.dispatchEvent(new Event('resize'));
    }
})