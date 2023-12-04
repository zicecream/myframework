import { _decorator, Component, Label, Node } from 'cc';
import { UICtrl } from '../../Framework/Managers/UICtrl';
import { EventMgr } from '../../Framework/Managers/EventMgr';
import { AuthProxy } from '../ServerProxy/AuthProxy';
const { ccclass, property } = _decorator;

@ccclass('StudyScrollViewUI_Ctrl')
export class StudyScrollViewUI_Ctrl extends UICtrl {
    onLoad(): void {
        super.onLoad();

        this.addButtonListener("AddItemBtn",this,this.onAddItemBtn)
    }
    onAddItemBtn(){
        // EventMgr.Instance.emit("startGame","hello world");
        // AuthProxy.Instance.userNameLogin("king","123456");
    }
}


