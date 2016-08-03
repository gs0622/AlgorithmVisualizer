logger._print('input array = [' + D.join(', ') + ']');

function partition(D, left, right) {
/* |    <= V  | V |   >= V    |
 * left         j             right */
    var i = left, j = right + 1, pivot = D[left];
    tracer._select(left)._select(right)._wait();
    while (true) {
        while (D[++i] < pivot) {
            tracer._select(i-1)._wait();
            tracer._deselect(i-1);
            if (i == right) break;
        }
        while (D[--j] > pivot) {
            tracer._select(j+1)._wait();
            tracer._deselect(j+1);
            if (j == left) break;
        }
        if (i >= j) break;
        tracer._notify(i, D[j])._wait()._denotify(i);
        tracer._notify(j, D[i])._wait()._denotify(j);
        logger._print('swap [' + D[i] + ', ' + D[j] + ']');
        [D[i], D[j]] = [D[j], D[i]];
    }
    tracer._notify(left, D[j])._wait()._denotify(left);
    tracer._notify(j, D[left])._wait()._denotify(j);
    logger._print('swap [' + D[left] + ', ' + D[j] + ']');
    [D[left], D[j]] = [D[j], D[left]];
    return j;
}

function quicksort1(D, left, right) { quicksort(D, left, right); }

function quicksort(D, left, right) {
    if (left >= right) return;
    var idx = partition(D, left, right);
    quicksort(D, left, idx-1);
    quicksort(D, idx+1, right);
}

quicksort(D, 0, D.length-1);
logger._print('sorted array = [' + D.join(', ') + ']');
