class Building extends Sprite{
    constructor({ position = { x: 0, y: 0}}) {
        super({
            position,
            imageSrc: './img/tower.png',
            frames: {
                max: 1
            },
            offset: {
                x: 0,
                y: -80
            }
        })
        this.width = 64 * 2
        this.height = 64
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.projectiles = []
        this.radius = 90
        this.target
        this.elapsedSpawnTime = 0
    }
    draw () {
        c.fillStyle = 'rgba(0,0,255,1)'
        c.fillRect(this.center.x-64,this.center.y-32,64,64)
        c.beginPath()
        c.arc(this.center.x, this.center.y, this.radius, 0, Math.PI*2)
        c.fillStyle= 'rgba(0,0,255,0)'
        c.fill()
        c.fillStyle = 'rgba(255, 255, 255, 0.6)'
        c.fillRect(this.center.x-5, this.center.y+32, 10, 500)
        
        

    }
    update() {
        this.draw()
        canvas.addEventListener('click', (event) =>{
        if (this.target) {
            this.projectiles.push(
                new Projectile ({
                position: {
                    x: this.center.x,
                    y: this.center.y
                },
                enemy: this.target
            }))
        }
        
    }
        )
}
}
