export enum RedPointConst {
    game = 0,
    game_equip,
    game_bag,
    game_mount,
    game_bag_item,
    game_bag_item1,
}

export const redPointConf = {
    [RedPointConst.game]:"game",
    [RedPointConst.game_equip]:"game.equip",
    [RedPointConst.game_bag]:"game.bag",
    [RedPointConst.game_mount]:"game.mount" ,
    [RedPointConst.game_bag_item]:"game.bag.item",
    [RedPointConst.game_bag_item1]:"game.bag.item1",
}

export class RedPointNode {
    public nodeName: string = "";
    public pointNum: number = 0;
    public parent: RedPointNode = null;
    public dictChilds: Map<string, RedPointNode> = new Map<string, RedPointNode>();
    public numChangeFunc: Function = null;

    public get redPointNum() {
        return this.pointNum;
    }

    public setRedPointNum(rpNum:number){
        if(this.dictChilds.size > 0){
            console.error("Only Can Set Leaf Node");
            return;
        }
        this.pointNum = rpNum;
        this.notifyPointNumChange();
        if(this.parent != null){
            this.parent.changePredPointNum();
        }
    }
    notifyPointNumChange(){
        if(this.numChangeFunc){
            this.numChangeFunc(this);
        }
    }
    changePredPointNum(){
        let num:number = 0;
        this.dictChilds.forEach(element => {
            num += element.pointNum;
        });
        if(num != this.pointNum){
            this.pointNum = num;
            this.notifyPointNumChange();
        }
        if(this.parent != null){
            this.parent.changePredPointNum();
        }
    }
}


export class RedPointManager {
    private rootNode: RedPointNode = null;
    private static _instance:RedPointManager = null;
    private constructor(){
        this.initRedPointTree();
    }
    public static getInstance(){
        if(!this._instance){
            this._instance = new RedPointManager();
        }
        return this._instance;
    }
    public initRedPointTree(): void {
        this.rootNode = new RedPointNode();
        this.rootNode.nodeName = redPointConf[RedPointConst.game];
        for (let d in RedPointConst) {
            let root = this.rootNode;
            let treeNodes = redPointConf[Number(RedPointConst[d])].split(".");
            if (treeNodes[0] != redPointConf[RedPointConst.game]){
                console.log("不存在的根节点")
                continue;
            }
            if (treeNodes.length > 1) {
                for (let i = 1; i < treeNodes.length; i++) {
                    if(!root.dictChilds.has(treeNodes[i])){
                        root.dictChilds.set(treeNodes[i],new RedPointNode());
                    }
                    root.dictChilds.get(treeNodes[i]).nodeName = treeNodes[i];
                    root.dictChilds.get(treeNodes[i]).parent = root;

                    root = root.dictChilds.get(treeNodes[i]);
                }
            }
        }
    }

    public setRedPointNodeCallBack(nodeConst:RedPointConst,callBack:Function){
        let nodePath = redPointConf[nodeConst];
        let nodeList:string[] = nodePath.split('.');
        if(nodeList.length == 1){
            if(nodeList[0] != redPointConf[RedPointConst.game]){
                console.log("不存在的根节点");
                return;
            }
        }
        let root = this.rootNode;
        for(let i = 1;i<nodeList.length;i++){
            if(!root.dictChilds.has(nodeList[i])){
                console.log("does not contains child node:"+nodeList[i]);
                return;
            }
            root = root.dictChilds.get(nodeList[i]);
            if(i == nodeList.length - 1){
                root.numChangeFunc = callBack;
                return;
            }
        }
    }

    public setRedPointNum(nodeConst: RedPointConst, pointNum: number): void {
        let nodePath = redPointConf[nodeConst];
        let nodeList:string[] = nodePath.split(".");
        if(nodeList.length == 1){
            if(nodeList[0]!=redPointConf[RedPointConst.game]){
                console.log("get wrong root node! current is" + nodeList[0]);
                return;
            }
        }

        let root = this.rootNode;
        for(let i = 1;i<nodeList.length;i++){
            if(!root.dictChilds.has(nodeList[i])){
                console.log("does not contains child node:" + nodeList[i]);
                return;
            }
            root = root.dictChilds.get(nodeList[i]);
            if(i == nodeList.length - 1){
                root.setRedPointNum(pointNum);
            }
        }
    }
}
