const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')

    canvas.width = 1280
    canvas.height = 768
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    const placementTilesData2D = []

   for (let i = 0; i < placementTilesData.length; i+= 20) {
    placementTilesData2D.push(placementTilesData.slice(i, i + 20))
   }

   

   const placementTiles = []

   placementTilesData2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 14) {
            //add building placement tile here
            placementTiles.push(
                new PlacementTile({
                position: {
                    x: x*64,
                    y: y * 64
                }
            })
        )
    }
})
})

    const image = new Image()
    
    image.onload = () => {
        animate()
        
    }
    image.src = 'img/gameMap.png'

    

    
    const spacing = 120;
    const enemies =[]
    let levelNumber = 0;
    let faster = 0;
    let levelCounter = 0; 
    let clicks = 0;
    let totalClicks =0;

    
    function setLevelConfig(levelNumber) {
        // Customize the number of enemies and distance between them for each wave
        switch (levelNumber) {
            case 1:
                return { waveEnemyCount: 19, enemyDistances: [ -240-(faster*8), -120-(faster*4), -120-(faster*4), -240-(faster*8), -240-(faster*8), -240-(faster*8), -120-(faster*4), -120-(faster*4), -240-(faster*8), -240-(faster*8), -240-(faster*8), -120-(faster*4), -120-(faster*4), -240-(faster*8), -240-(faster*8), -240-(faster*8), -240-(faster*8), -240-(faster*8), -240-(faster*8)] };
            case 2:
                return { waveEnemyCount: 21, enemyDistances: [ -120-(faster*4), -240-(faster*8), -240-(faster*8), -120-(faster*4), -240-(faster*8), -120-(faster*4), -240-(faster*8), -120-(faster*4), -240-(faster*8), -240-(faster*8), -120-(faster*4), -240-(faster*8), -240-(faster*8), -120-(faster*4), -240-(faster*8), -120-(faster*4), -240-(faster*8), -120-(faster*4), -120-(faster*4), -120-(faster*4), -120-(faster*4)] };
            case 3:
                return { waveEnemyCount: 30, enemyDistances: [ -120-(faster*4), -60-(faster*2), -60-(faster*2), -120-(faster*4), -120-(faster*4), -120-(faster*4), -120-(faster*4), -240-(faster*8),
                                                               -120-(faster*4), -60-(faster*2), -60-(faster*2), -120-(faster*4), -120-(faster*4), -240-(faster*8), -240-(faster*8),
                                                               -120-(faster*4), -60-(faster*2), -60-(faster*2), -120-(faster*4), -120-(faster*4), -120-(faster*4), -120-(faster*4), -240-(faster*8),
                                                               -120-(faster*4), -60-(faster*2), -60-(faster*2), -120-(faster*4), -180-(faster*6), -180-(faster*6), -120-(faster*4)] };
            case 4:
                return { waveEnemyCount: 22, enemyDistances: [ -240-(faster*8), -240-(faster*8), -120-(faster*4), -240-(faster*8), -120-(faster*4), -120-(faster*4), -60-(faster*2), -60-(faster*2), -120-(faster*4), -120-(faster*4), -240-(faster*8), -240-(faster*8),
                                                               -240-(faster*8), -240-(faster*8), -120-(faster*4), -240-(faster*8), -120-(faster*4), -120-(faster*4), -120-(faster*4), -120-(faster*4), -360-(faster*12), 240-(faster*8)] };
            case 5:
                return { waveEnemyCount: 28, enemyDistances: [-180-(faster*6), -180-(faster*6), -240-(faster*8), -60-(faster*2), -120-(faster*4), -240-(faster*8),
                                                              -120-(faster*4), -60-(faster*2), -120-(faster*4), -60-(faster*2), -120-(faster*4), -120-(faster*4), -120-(faster*4), -240-(faster*8),
                                                              -120-(faster*4), -240-(faster*8), -240-(faster*8), -60-(faster*2), -120-(faster*4), -240-(faster*8),
                                                              -180-(faster*6), -60-(faster*2), -60-(faster*2), -60-(faster*2), -180-(faster*6), -60-(faster*2), -120-(faster*4)] };
            
           
        }
    }
    // Initialize levelNumber to 1
    let speedIncrement = 0; // Variable to track the speed increment

    function spawnEnemies(waveEnemyCount, enemyDistances) {
        const customXPositions = [waypoints[0].x]; // Start with the first waypoint x position
        for (let i = 1; i < waveEnemyCount; i++) {
            const distanceIndex = Math.min(i - 1, enemyDistances.length - 1); // Subtract 1 to adjust for array index
            const prevXPosition = customXPositions[i - 1];
            const xOffset = enemyDistances[distanceIndex];
            const customXPosition = prevXPosition - xOffset; // Use subtraction for deviation from the previous enemy
            customXPositions.push(customXPosition); // Store the custom x position in the array
        }
    
        for (let i = 0; i < waveEnemyCount; i++) {
            const x = customXPositions[i]; // Use the custom x position for each enemy
            enemies.push(new Enemy({
                position: { x: x, y: waypoints[0].y }
            }));
        }
    }



const buildings = []
let activeTile = undefined
let enemyCount = 3
let hearts = 3
let coins = 0
let ClickTimes = 0
let ClicksMaximum = 30



    
function animate(){

    
    const  animationId = requestAnimationFrame(animate)
   
    c.drawImage(image, 0, 0)
    
      
    
    for (let i = enemies.length - 1 ; i >=0; i--){
        const enemy = enemies[i]
        enemy.update()
        if (enemy.position.x < 0){
            hearts -=1
            enemies.splice(i, 1)
            document.querySelector('#hearts').innerHTML = hearts
            function playSound(lifeSound){
                let audio = new Audio(lifeSound)
                audio.play();
            }
            playSound("sound/life.wav")
            
        if (hearts < 1) {
            
            console.log('game over')
            cancelAnimationFrame(animationId)
            localStorage.setItem('mostRecentScore', coins);
            const submitResultLink = document.getElementById('länk');
        
            submitResultLink.style.visibility = 'visible';
        

        // Set the styles for the link when it's game over
        submitResultLink.style.color = 'white';
        submitResultLink.style.fontSize = '60px';
            
        } 
        }
    
    }
    
    
    if (enemies.length === 0) {
        if(ClickTimes>ClicksMaximum){
            console.log('game over')
                cancelAnimationFrame(animationId)
                alert("Du klickade precis " + ClickTimes + " gånger! Tornet gick sönder och alla invånare i byn tvingades fly!");
                const submitResultLink = document.getElementById('länk');
        
            submitResultLink.style.visibility = 'visible';
                

            
            }
        else {
            ClickTimes=0
            function playSound(pointSound){
                let audio = new Audio(pointSound)
                audio.play();
            }
            if(levelCounter===1){
            playSound("sound/tack1.m4a")
            }
            if(levelCounter===2){
                playSound("sound/tack2.m4a")
                }
            if(levelCounter===3){
                playSound("sound/tack3.m4a")
                }
            if(levelCounter===4){
                playSound("sound/tack4.m4a")
                }
            if(levelCounter===5){
                playSound("sound/tack5.m4a")
                }
            if(levelCounter===6){
                playSound("sound/tack6.m4a")
                }
            if(levelCounter===7){
                playSound("sound/tack7.m4a")
                }
            if(levelCounter===8){
                playSound("sound/tack8.m4a")
                }
            if(levelCounter===9){
                playSound("sound/tack9.m4a")
                }
            if(levelCounter===10){
                playSound("sound/tack10.m4a")
                }
                if(levelCounter===11){
                    playSound("sound/tack11.m4a")
                    }
                    if(levelCounter===12){
                        playSound("sound/tack12.m4a")
                        }
                    if(levelCounter===13){
                        playSound("sound/tack13.m4a")
                        }
                    if(levelCounter===14){
                        playSound("sound/tack14.m4a")
                        }
                    if(levelCounter===15){
                        playSound("sound/tack15.m4a")
                        }
                    if(levelCounter===16){
                        playSound("sound/tack16.m4a")
                        }
                    if(levelCounter===17){
                        playSound("sound/tack17.m4a")
                        }
                    if(levelCounter===18){
                        playSound("sound/tack18.m4a")
                        }
                    if(levelCounter===19){
                        playSound("sound/tack19.m4a")
                        }
                    if(levelCounter===20){
                        playSound("sound/tack20.m4a")
                        }

            

        }
        

        
        // Get the configuration for the current level
        if (levelNumber<5 ){
        levelNumber ++
        levelCounter ++
        }
        else{
            levelNumber=1
            levelCounter ++
            if(faster>-20)
            faster -=5
            
        }
    
        
        
        const { waveEnemyCount, enemyDistances } = setLevelConfig(levelNumber);
        
        enemyCount += waveEnemyCount;
        spawnEnemies(waveEnemyCount, enemyDistances);

    
        // Increment levelNumber for the next level
        
    }
    placementTiles.forEach((tile) =>{
        tile.update(mouse)
    })
 
    
    buildings.forEach((building) => {
        building.update()
        building.target = null
        const validEnemies = enemies.filter(enemy => {
            const xDifference = enemy.center.x - building.center.x
            const yDifference = enemy.center.y - building.center.y
            const distance = Math.hypot(xDifference, yDifference)
            return distance < enemy.radius + building.radius
        })
        building.target = validEnemies[0]


        for (let i = building.projectiles.length - 1; i >=0; i--){
         const projectile = building.projectiles[i]
        
            projectile.update()

            const xDifference = projectile.enemy.center.x - projectile.position.x
            const yDifference = projectile.enemy.center.y - projectile.position.y
            const distance = Math.hypot(xDifference, yDifference)

            //this is when a projectile hits an enemy
            if (distance < projectile.enemy.radius + projectile.radius){
                //enemy health and enemy removal
                projectile.enemy.health -=100
                if (projectile.enemy.health <= 0){
                    const enemyIndex = enemies.findIndex((enemy) => {
                        return projectile.enemy === enemy
                    })
                    if (enemyIndex > -1){
                        
                    enemies.splice(enemyIndex, 1)
                    
                    coins +=1
                    document.querySelector('#coins').innerHTML = "POINTS: " +" "+ coins
                    function playSound(pointSound){
                        let audio = new Audio(pointSound)
                        audio.play();
                    }
                    playSound("sound/trumma.mp3")
//
                    }
                }
                //tracking total amount of enemies

                
                
                building.projectiles.splice(i, 1)
                building.splice(i,1)
            }
            } 
        
        })

    
    
    
}

const mouse = {
    x: undefined,
    y: undefined
}



canvas.addEventListener('click', (event) => {
    
    
    if(activeTile && !activeTile.isOccupied) {
        
        buildings.push(new Building({
            position: {
                x: activeTile.position.x,
                y: activeTile.position.y
            }
    
        })

        )
        activeTile.isOccupied = true
        
        
    }
    ClickTimes++
    
    
    

})
window.addEventListener('mousemove', (event) =>{
    mouse.x = event.clientX
    mouse.y = event.clientY

    activeTile = null
    for (let i =0; i < placementTiles.length; i++){
        const tile = placementTiles[i]
        if( 
          mouse.x > tile.position.x &&
          mouse.x < tile.position.x + tile.size &&
          mouse.y > tile.position.y &&
          mouse.y < tile.position.y + tile.size
          ) {
                activeTile = tile
            break
    }
    
    
    }

    
})

animate()


