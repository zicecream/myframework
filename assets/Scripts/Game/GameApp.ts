
import { _decorator, Component, Node, AudioClip, AudioSource, Prefab, TextAsset } from 'cc';
import { ResMgr } from '../Framework/Managers/ResMgr';
import { SoundMgr } from '../Framework/Managers/SoundMgr';
import { TimerMgr } from '../Framework/Managers/TimerMgr';
import { UIMgr } from '../Framework/Managers/UIMgr';
import { EventMgr } from '../Framework/Managers/EventMgr';
import { ProtoMgr } from '../Framework/Managers/Net/ProtoMgr';
import { NetEventDispatcher } from './ServerProxy/NetEventDispatcher';
import { GameLanch } from '../GameLanch';
import { AuthProxy } from './ServerProxy/AuthProxy';
import { ExcelMgr } from '../Framework/Managers/ExcelMgr';

var resPkg = {
    // "Sounds": [
    //     { assetType: AudioClip},
    // ],
    "Sounds":AudioClip,
    "GUI": [
        {
            assetType: Prefab, 
            urls: [
                "UIPrefabs/LoginUI",
                "UIPrefabs/StudyScrollViewUI",
            ],
        },
    ],
    "Datas":TextAsset
}

export class GameApp extends Component {
    public static Instance: GameApp = null as unknown as GameApp;
    onLoad(): void {
        if (GameApp.Instance === null) {
            GameApp.Instance = this;
        }
        else {
            this.destroy();
            return;
        }
        if(GameLanch.Instance.isNetMode){
            this.node.addComponent(NetEventDispatcher).init();
            AuthProxy.Instance.init();
        }
    }

    // 游戏逻辑入口
    public EnterGame(): void {
        UIMgr.Instance.showUIPrefab(GameLanch.Instance.UILoading);
        console.log("Enter Game ....!");
        ResMgr.Instance.preloadResPkg(resPkg, (now: any, total: any) => {
            EventMgr.Instance.emit("loadProgress", Math.floor(now * 100 / total));
        }, () => {
            TimerMgr.Instance.Once(()=>{
                this.EnterLoadingScene();
            },0.5)
        });
    }

    public EnterLoadingScene(): void {
        /*
        // 释放测试
        ResMgr.Instance.releaseResPkg(resPkg);

        this.scheduleOnce(()=>{
            console.log(ResMgr.Instance.getAsset("Sounds", "CK_attack1"));
        }, 3)*/

        // 释放游戏地图
        // end

        // 释放游戏角色
        // end

        // 释放我们的游戏UI
        // end

        // 播放声音
        // var as = this.node.addComponent(AudioSource);
        // as.clip = ResMgr.Instance.getAsset("Sounds", "CK_attack1");
        // as.loop = true;
        // as.play();
        // var id = TimerMgr.Instance.Schedule(()=>{
        //     console.log("test  ")
        //     var clip = ResMgr.Instance.getAsset("Sounds","CK_attack1");
        //     SoundMgr.Instance.playSound(clip);
        // },6,1,1);
        // end
        UIMgr.Instance.clearAll();
        // UIMgr.Instance.showUIView("StudyScrollViewUI");
        UIMgr.Instance.showUIView("LoginUI");
        // EventMgr.Instance.addEventListener("startGame",this,this.onEventCall)
        // 测试Probuf
        // var buf = ProtoMgr.Instance.serializeMsg("UnameLoginReq", {uname: "blake", upwd: "123456"});
        // console.log(buf);

        // // 解码
        // var msg = ProtoMgr.Instance.deserializeMsg("UnameLoginReq", buf);
        // console.log(msg);
        // end
        // ExcelMgr.Instance.AddExcelTable("map",ResMgr.Instance.getAsset("Datas","map").text,true);
        // var excel = ExcelMgr.Instance.GetExcelArray("map");
        // console.log(excel);
        // var ret = ExcelMgr.Instance.QueryOneFromExcel("map",null,5);
        // console.log(ret);
    }
    public onEventCall(eventName:string,udata:any){
        console.log(udata);
    }
}
