import { _decorator, Component, Label, Node } from 'cc';
import { UICtrl } from '../../Framework/Managers/UICtrl';
import { EventMgr } from '../../Framework/Managers/EventMgr';
import { AuthProxy } from '../ServerProxy/AuthProxy';
import { UtilsScreen } from '../../Framework/Utils/UtilsScreen';
const { ccclass, property } = _decorator;

@ccclass('LoginUI_Ctrl')
export class LoginUI_Ctrl extends UICtrl {
    private version:Label = null as unknown as Label;
    onLoad(): void {
        super.onLoad();
        this.version = this.view["Version"].getComponent(Label);
        this.version.string = "2.0.0";

        this.addButtonListener("Start",this,this.onStartButton)
        UtilsScreen.Instance.adaptFullScreenBG(this.view["BackGround"])
    }
    onStartButton(){
        EventMgr.Instance.emit("startGame","hello world");
        // AuthProxy.Instance.userNameLogin("king","123456");
    }
}


