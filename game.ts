import * as PIXI from 'pixi.js'
import fishImage from "./images/fish.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import { Sprite, UPDATE_PRIORITY } from 'pixi.js'
import { Fish } from './fish'

export class Game {
    pixi: PIXI.Application
    fishes: Fish[] = []
    loader: PIXI.Loader
    fish: PIXI.Sprite

    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader.add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
            .add('')
        this.loader.load(() => this.loadCompleted())
    }

    loadCompleted() {
        for (let i = 0; i < 100; i++) {
            this.fishes.push(new Fish(this.loader.resources["fishTexture"].texture!, this))
        }

        this.pixi.ticker.add((delta: number) => this.update(delta))
    }

    update(delta: number) {
        for (const fish of this.fishes) {
            fish.update(delta)
        }
    }

    collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}

new Game()




