import { NetEventDispatcher } from "./NetEventDispatcher";
import {Cmd} from "./Cmd"
import { Stype } from "./Stype";
import { EventMgr } from "../../Framework/Managers/EventMgr";
export class AuthProxy {
    public static Instance:AuthProxy = new AuthProxy();
    public init():void{
        EventMgr.Instance.addEventListener(Stype[Stype.Auth],this,this.onAuthServerReturn)
    }

    public userNameLogin(uname:string,upwd:string):void{
        NetEventDispatcher.Instance.sendMsg(Stype.Auth,Cmd.UnameLoginReq,{uname:uname,upwd:upwd});
    }

    private onAuthServerReturn(eventName:string,msg:any):void{
        switch(msg.ctype){

        }
    }
}


