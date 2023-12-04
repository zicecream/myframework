import { _decorator, Component, Node ,view,UITransform} from 'cc';

export class UtilsScreen extends Component {
    public static Instance: UtilsScreen = null as unknown as UtilsScreen;
    onLoad(): void {
        if(UtilsScreen.Instance === null) {
            UtilsScreen.Instance = this;
        }
        else {
            this.destroy();
            return;
        }
    }

    adaptFullScreenBG(bgNode:Node):void{
        const screenSize = view.getDesignResolutionSize();

        const bgSize = bgNode.getComponent(UITransform).contentSize;

        const widthAdaptScale = screenSize.width/bgSize.width;

        const heightAdaptScale = screenSize.height/bgSize.height;

        const adaptScale = widthAdaptScale > heightAdaptScale ? widthAdaptScale : heightAdaptScale;
        
        // bgNode.setScale(adaptScale,adaptScale);
        bgNode.getComponent(UITransform).setContentSize(screenSize.width*1.2,screenSize.height*1.2);
    }
}


