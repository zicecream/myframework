import { Mask } from 'cc';
import { tween } from 'cc';
import { UITransform } from 'cc';
import { Graphics } from 'cc';
import { color } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { privateDecrypt } from 'crypto';
const { ccclass, property } = _decorator;

@ccclass('Wave')
export class Wave extends Component {
    @property(Mask) mask:Mask = null;
    @property(Number) h:number = 50;
    @property(Number) n:number = 20;
    @property(Number) speedFast:number = 0.98;
    @property(Number) speedCost:number = 0.98;
    @property(Number) maxWaveHeight:number = 40;
    private nodeArray:any[] = [];
    private nodeEnergy:number[] = new Array<number>;
    onLoad () {
        this.nodeArray = [];         // 装载水面上的点
        this.nodeEnergy = [];        // 每个点的能量
        // 赋予初始值
        for (let i = 0; i < this.n; i++) {
            this.nodeEnergy[i] = 0;
        }
    }

    start () {
        // 创建水面上点
        for (let i = 0; i < this.n; i++) {
            let node = {x: 0, y: 0};
            node.y = this.h;
            node.x = -this.node.getComponent(UITransform).width*0.5 + (i + 1) * this.node.getComponent(UITransform).width / this.n;
            this.nodeArray[i] = node;
        }
        // 最右侧点缓动
        let obj = this.nodeArray[this.n-1];
        let time = 0.5;
        tween(obj)
            .repeatForever(
                tween()
                .to(time, { y: this.maxWaveHeight + this.h}, { easing: 'sineOut'})
                .to(time, { y: 0 + this.h}, { easing: 'sineIn'})
                .to(time, { y: -this.maxWaveHeight + this.h}, { easing: 'sineOut'})
                .to(time, { y: 0 + this.h}, { easing: 'sineIn'})
            )
        .start();
    }

    // 利用遮罩原理，把下方显示
    showWater () {
        const draw = this.mask.node.getComponent(Graphics);
        draw.clear();
        draw.lineWidth = 1;
        draw.strokeColor = color(255,0,0);
        draw.fillColor = color(0,255,0);
        let width = this.node.getComponent(UITransform).width*0.5;
        let height = this.node.getComponent(UITransform).height;
        draw.moveTo(-width, this.h);
        for (let i = 0; i < this.n; i+=2) {
            // 贝塞尔
            draw.quadraticCurveTo(this.nodeArray[i].x, this.nodeArray[i].y, this.nodeArray[i+1].x, this.nodeArray[i+1].y);
        }
        // 封闭区域
        draw.lineTo(width, -height);
        draw.lineTo(-width, -height);
        draw.lineTo(-width, this.h);
        draw.fill();
        draw.stroke();
    }

    update (dt) {
        // 左右点互相影响 2 次, 决定波的传播快慢
        for (let k = 0; k < 2; k++) {
            for (let i = 0; i < this.n; i++) {
                if (i > 0) {
                    // 0.02 的传播损失
                    // 向左传
                    this.nodeEnergy[i-1] += this.speedFast * (this.nodeArray[i].y - this.nodeArray[i-1].y);
                }
                if (i < this.n - 1) {
                    // 向右传
                    this.nodeEnergy[i+1] += this.speedFast * (this.nodeArray[i].y - this.nodeArray[i+1].y);
                }
            }
        }  
        // 最右侧的跳过
        for (let i = 0; i < this.n - 1; i++) {
            // 0.02 速度损失
            this.nodeEnergy[i] *= this.speedCost;
            // 改变位置
            this.nodeArray[i].y += this.nodeEnergy[i] * dt;
        }
        this.showWater();
    }
}


