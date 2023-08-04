let levelNumber = 1; // Initialize levelNumber to 1

function spawnEnemies(waveEnemyCount, enemyDistances) {
    for (let i = 0; i < waveEnemyCount; i++) {
        const xOffset = i < enemyDistances.length ? i * enemyDistances[i] : (i - enemyDistances.length) * enemyDistances[enemyDistances.length - 1];
        enemies.push(new Enemy({
            position: { x: waypoints[0].x - xOffset, y: waypoints[0].y }
        }));
    }
}

function setLevelConfig(levelNumber) {
    // Customize the number of enemies and distance between them for each wave
    switch (levelNumber) {
        case 1:
            return { waveEnemyCount: 4, enemyDistances: [-120, -150, -180, -200] };
        case 2:
            return { waveEnemyCount: 5, enemyDistances: [-100, -130, -160, -190, -220] };
        // Add more cases for other levels as needed
        default:
            return { waveEnemyCount: 4, enemyDistances: [-120, -150, -180, -200] };
    }
}

if (enemies.length === 0) {
    // Get the configuration for the current level
    const { waveEnemyCount, enemyDistances } = setLevelConfig(levelNumber);

    enemyCount += waveEnemyCount;
    spawnEnemies(waveEnemyCount, enemyDistances);
}