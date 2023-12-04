import { _decorator, Component, Node } from 'cc';
import { GameLanch } from '../../GameLanch';
import { ProtoMgr } from '../../Framework/Managers/Net/ProtoMgr';
import { Cmd } from './Cmd';
import { NetMgr } from '../../Framework/Managers/Net/NetMgr';
import { EventMgr } from '../../Framework/Managers/EventMgr';
import { Stype } from './Stype';

export class NetEventDispatcher extends Component {
    public static Instance:NetEventDispatcher = null as unknown as NetEventDispatcher;
    onLoad():void{
        if(NetEventDispatcher.Instance === null){
            NetEventDispatcher.Instance = this;
        }else{
            this.destroy();
            return;
        }
    }
    public init():void{
        EventMgr.Instance.addEventListener("net_message",this,this.onRecMsg);
    }
    
    public sendMsg(stype:number,ctype:number,msg:any){
        //序列化msg，转换为buf
        var msgBuf = ProtoMgr.Instance.serializeMsg(Cmd[ctype],msg);
        //end

        //按照协议封装好二进制数据包
        //DataView工具，往buffer里写东西
        //[stype,ctype,4,body Buf]
        var totalLen = msgBuf.length+2+2+4;
        var buf = new ArrayBuffer(totalLen);
        
        var dataView = new DataView(buf);
        dataView.setInt16(0,stype,true);
        dataView.setInt16(2,ctype,true);
        dataView.setInt16(4,0,true);

        var uint8Buf = new Uint8Array(buf);
        uint8Buf.set(msgBuf,8);
        //end

        //调用websocket发送
        NetMgr.Instance.sendData(buf);
        //end
    }

    private onRecMsg(uname:string,udata:ArrayBuffer):void{
        //获取服务号，命令号
        var dataView = new DataView(udata);
        var stype = dataView.getInt16(0,true);
        var ctype = dataView.getInt16(2,true);
        //end
        
        //获取我们的序列化后的二进制数据
        var uint8Buf:Uint8Array = new Uint8Array(udata);
        var msgBuf = uint8Buf.subarray(4+4);
        //end

        //反序列化二进制数据body 为一个对象
        var msgBody = ProtoMgr.Instance.deserializeMsg(Cmd[ctype],msgBuf);
        //end

        EventMgr.Instance.emit(Stype[stype],{stype:stype,ctype:ctype,body:msgBody});
    }
}


