import * as PIXI from 'pixi.js'
import { Sprite } from 'pixi.js'
import { Game } from './game'

export class Fish extends PIXI.Sprite {
    pixi: PIXI.Application
    fishes: PIXI.Sprite[] = []
    fish: PIXI.Sprite
    private game: Game
    private xspeed: number = 5 
    private yspeed: number = 0

    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game

        // this.speed = Math.random() * 6 + 1
        this.texture = texture
        this.x = Math.random() * game.pixi.screen.bottom
        this.y = Math.random() * game.pixi.screen.right
        this.tint = Math.random() * 0xFFFFFF
        this.scale.set(-1, 1)
        this.anchor.set(0.5)

        game.pixi.stage.addChild(this)

        this.interactive = true;
        this.on('pointerdown', () => this.onClick());
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }
    onKeyUp(e: KeyboardEvent): any {
        if(e.key == "ArrowRight") {
            this.xspeed = 0
         }
        if(e.key == "ArrowLeft") {
            this.xspeed = 0 
        }
    }
    onKeyDown(e: KeyboardEvent): any {
        console.log(e.key)
        if(e.key == "ArrowRight") {
           this.xspeed = 5
        }
        if(e.key == "ArrowLeft") {
            this.xspeed = -5
        }
    }
    private onClick() {
        this.game.pixi.stage.removeChild(this)
    }


    public update(delta: number) {
        
        this.x += this.xspeed * delta
        // this.y += Math.sin(this.x * 0.02)

        this.keepInScreenRight()
        // this.keepInScreenLeft()
    }

    private keepInScreenRight() {
        if (this.getBounds().left > this.game.pixi.screen.right)
            this.x = -this.getBounds().width
    }

    // private keepInScreenLeft() {
    //     if (this.getBounds().right > this.game.pixi.screen.left)
    //         this.x = this.getBounds().width
    // }

    


}
