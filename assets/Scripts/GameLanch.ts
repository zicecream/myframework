import { _decorator, Component, Node, Prefab ,TextAsset} from 'cc';
import { ResMgr } from './Framework/Managers/ResMgr';
import { GameApp } from './Game/GameApp';
import { SoundMgr } from './Framework/Managers/SoundMgr';
import { TimerMgr } from './Framework/Managers/TimerMgr';
import { UIMgr } from './Framework/Managers/UIMgr';
import { EventMgr } from './Framework/Managers/EventMgr';
import { NetMgr } from './Framework/Managers/Net/NetMgr';
import { ProtoMgr } from './Framework/Managers/Net/ProtoMgr';
import { ExcelMgr } from './Framework/Managers/ExcelMgr';
import { UtilsScreen } from './Framework/Utils/UtilsScreen';
const { ccclass , property} = _decorator;
@ccclass('GameLanch')
export class GameLanch extends Component {
    public static Instance: GameLanch = null as unknown as GameLanch;

    @property
    public isNetMode: boolean = false;

    @property
    private wsUrl:string = "ws://127.0.0.1:6081/ws";

    @property(TextAsset)
    private pbTexAsset:TextAsset|null = null;

    @property(Prefab)
    public UILoading:Prefab = null as unknown as Prefab;

    onLoad():void{
        if(GameLanch.Instance === null){
            GameLanch.Instance = this;
        }else{
            this.destroy();
            return;
        }

        //初始化游戏框架：资源管理模块，网络模块，协议模块，日志模块
        this.node.addComponent(ExcelMgr);
        this.node.addComponent(ResMgr);
        this.node.addComponent(SoundMgr);
        this.node.addComponent(TimerMgr);
        this.node.addComponent(UIMgr);
        this.node.addComponent(EventMgr);
        this.node.addComponent(UtilsScreen);
        //end

        //是否使用网络模块
        if(this.isNetMode){
            this.node.addComponent(ProtoMgr).Init(this.pbTexAsset);
            this.node.addComponent(NetMgr).Init(this.wsUrl);
        }
        //end

        //检查更新资源
        //end
        
        this.node.addComponent(GameApp);
        GameApp.Instance.EnterGame();
    }
}
