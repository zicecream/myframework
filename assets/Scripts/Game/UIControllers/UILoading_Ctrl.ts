import { _decorator, Node, Label} from 'cc';
import { EventMgr } from '../../Framework/Managers/EventMgr';
import {UtilsScreen} from '../../Framework/Utils/UtilsScreen';
import { UICtrl } from "./../../Framework/Managers/UICtrl";
const { ccclass, property } = _decorator;
@ccclass('UILoading_Ctrl')
export class UILoading_Ctrl extends UICtrl {
    private progressValue: Label = null as unknown as Label;
    onLoad(): void {
        super.onLoad();
        this.progressValue = this.view["Progress"].getComponent(Label);
        this.progressValue.string = "0%";

        UtilsScreen.Instance.adaptFullScreenBG(this.view["BackGround"]);
        EventMgr.Instance.addEventListener("loadProgress", this, this.onProgressUpdate);
    }

    private onProgressUpdate(name: string, per: number): void {
        this.progressValue.string = per + "%";
    }

    onDestroy(): void {
        EventMgr.Instance.removeListener("loadProgress", this, this.onProgressUpdate)
    }
}
