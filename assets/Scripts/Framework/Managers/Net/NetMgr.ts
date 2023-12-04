import { _decorator, Component, Node } from 'cc';
import { EventMgr } from '../EventMgr';
enum State{
    Disconnected = 0,//断开连接
    Connecting = 1,//正在连接
    Connected = 2.//已经连接
}
export class NetMgr extends Component {
    public static Instance:NetMgr = null as unknown as NetMgr;
    private url:string  = "ws://127.0.0.1:6081/ws";
    private state:number = State.Disconnected;
    private sock:WebSocket|null = null;
    onLoad():void{
        if(NetMgr.Instance === null){
            NetMgr.Instance = this;
        }else{
            this.destroy();
            return;
        }
    }
    public Init(url:string):void{
        this.url = url;
    }
    //发起连接
    private connectToServer():void{
        if(this.state !== State.Disconnected){
            return;
        }
        EventMgr.Instance.emit("net_connecting",null);

        this.state = State.Connecting;
        this.sock = new WebSocket(this.url);//H5标准
        this.sock.binaryType = "arraybuffer";//blob模式，二进制模式(arraybuffer)

        this.sock.onopen = this.onOpened.bind(this);
        this.sock.onmessage = this.onRecvData.bind(this);
        this.sock.onclose = this.onSocketClose.bind(this);
        this.sock.onerror = this.onSocketErr.bind(this);
    }

    //连接成功
    private onOpened(event:any){
        this.state = State.Connected;
        console.log("connect to server:"+this.url+" success connected");
        EventMgr.Instance.emit("net_connect",null);
    }
    //关闭
    private onSocketClose(event:any){
        if(this.state === State.Connected){
            if(this.sock !== null){
                this.sock.close();
                this.sock = null;
            }
        }
        EventMgr.Instance.emit("net_disconnect",null);
        this.state = State.Disconnected;
    }

    private onSocketErr(event:any){
        this.closeSocket();
    }

    public closeSocket(){
        if(this.state === State.Connected){
            if(this.sock !== null){
                this.sock.close();
                this.sock = null;
            }
        }
        EventMgr.Instance.emit("net_disconnect",null);
        this.state = State.Disconnected;
    }

    //接收数据
    private onRecvData(event:any){
        EventMgr.Instance.emit("net_message",event.data);
    }

    //发送数据
    public sendData(dataArraybuf:ArrayBuffer){
        if(this.state === State.Connected && this.sock){
            this.sock.send(dataArraybuf);
        }
    }

    update(){
        if(this.state !== State.Disconnected){
            return;
        }
        this.connectToServer();
    }
}


