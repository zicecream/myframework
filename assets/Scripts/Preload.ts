import { _decorator, assetManager, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Preload')
export class Preload extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }
    preloadResource(){
        let resourceBundle = assetManager.bundles.get("resources");
        const respourcePaths = resourceBundle.getDirWithPath("./");
        resourceBundle.preloadDir("./",(completedCount:number,totalCount:number,item)=>{
            console.log("预加载进度:",completedCount,totalCount);
        },(err:Error | null,data:any)=>{
            if(err){
                console.log("preload error:",err.message);
            }
        })
        // ResourceManager._instance.Load(PageDefine.Main,Prefab);
        // ResourceManager._instance.Load("prefab/ui/game/MainPage/MainPagePrefab/NodeBattle",Prefab);
        // const preloadArr:any[] = [PageDefine.PinnaclearenaPage,PageDefine.PeakTodaysRankingspage]
        // for(let i = 0;i<preloadArr.length;i++){
        //     const path = preloadArr[i];
        //     resources.preload(path,(completedCount:number,totalCount:number,item)=>{
        //         // console.log("预加载进度:",completedCount,totalCount);
        //     },(err:Error | null,data:any)=>{
        //         if(err){
        //             console.log("preload error:",err.message);
        //         }
        //     })
        // }
        // for(let key in PageDefine){
        //     const path = PageDefine[key];
        //     resources.preload(path,(completedCount:number,totalCount:number,item)=>{
        //         // console.log("预加载进度:",completedCount,totalCount);
        //     },(err:Error | null,data:any)=>{
        //         if(err){
        //             console.log("preload error:",err.message);
        //         }
        //     })
        // }
        // for(let i = 0;i<respourcePaths.length;i++){
        //     const path = respourcePaths[i].path;
        //     resources.preload(path,(completedCount:number,totalCount:number,item)=>{
        //         console.log("预加载进度:",completedCount,totalCount);
        //     },(err:Error | null,data:any)=>{
        //         if(err){
        //             console.log("preload error:",err.message);
        //         }
        //     })
        // }
    }
}


