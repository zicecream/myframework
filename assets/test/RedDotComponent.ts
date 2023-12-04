import { _decorator, Component, Enum, Label, Node, primitives, UIOpacity, UITransform } from 'cc';
import { RedPointConst, redPointConf, RedPointManager, RedPointNode } from './RedDotManager';
const { ccclass, property } = _decorator;

@ccclass('RedDotComponent')
export class RedDotComponent extends Component {
    @property({type:Enum(RedPointConst)}) 
    private RedPointType:RedPointConst = RedPointConst.game;
    @property(Function)
    private _changeFun:Function = null;
    @property(Label)
    private numLabel:Label = null;
    @property(Label)
    private labelName:Label = null;
    @property(Node)
    private redDot:Node = null;

    private redPointNumber:number = 0;
    onLoad(){
        let redPointManager = RedPointManager.getInstance();
        redPointManager.setRedPointNodeCallBack(this.RedPointType,this.changeFun.bind(this))
        this.labelName.string = redPointConf[this.RedPointType];
    }
    changeFun(redPoint:RedPointNode){
        this.redDot.active = redPoint.redPointNum > 0;
        this.numLabel.string = redPoint.redPointNum.toString();
    }
    add(){
        this.redPointNumber++;
        RedPointManager.getInstance().setRedPointNum(this.RedPointType,this.redPointNumber);
    }
    sub(){
        this.redPointNumber--;
        RedPointManager.getInstance().setRedPointNum(this.RedPointType,this.redPointNumber);
    }
}


