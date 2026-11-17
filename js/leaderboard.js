function getRecords() {
    return JSON.parse(localStorage.getItem('2048-records')) || [];
}

function saveRecord(name, score) {
    const records = getRecords();

    records.push({
        name: name,
        score: score,
        date: new Date().toLocaleDateString('ru-RU')
    });

    records.sort((a, b) => b.score - a.score);

    localStorage.setItem(
        '2048-records',
        JSON.stringify(records.slice(0, 10))
    );
}

function showLeaderboard() {
    const records = getRecords();
    const list = document.getElementById('leaderboard-list');

    list.innerHTML = '';

    records.forEach(record => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        const scoreCell = document.createElement('td');
        const dateCell = document.createElement('td');

        nameCell.textContent = record.name;
        scoreCell.textContent = record.score;
        dateCell.textContent = record.date;

        row.append(nameCell, scoreCell, dateCell);
        list.appendChild(row);
    });

    document.getElementById('leaderboard').classList.remove('hidden');
}

document.getElementById('show-leaders').addEventListener(
    'click',
    showLeaderboard
);

document.getElementById('close-leaders').addEventListener('click', () => {
    document.getElementById('leaderboard').classList.add('hidden');
});

document.getElementById('save-record').addEventListener('click', function() {
    const nameInput = document.getElementById('player-name');
    const name = nameInput.value.trim();

    if (name === '') {
        alert('Введите имя');
        return;
    }

    saveRecord(name, score);

    nameInput.classList.add('hidden');
    this.classList.add('hidden');

    document.querySelector('#game-over h2').textContent =
        'Рекорд сохранен :)';
});