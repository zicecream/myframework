/***

 * 列表的drawcall减少方案

 * 1：对滑动进行监听

 * 2：对超出可视区域的节点透明度设置为0

 */

export default class ScrollOpacityList

{

    //滚动列表的持有对象

    private m_stScrollView: cc.ScrollView;

    //是否使用安全模式

    private m_bSafe: boolean;

    //列表是否处于滚动状态

    private m_bIsScrolling: boolean;

    //检测的子节点的容器节点（当前节点必须在scrollview所在节点下，child所在节点上，默认为scrollview的content节点）

    private m_stChildParent: cc.Node;

    //当前列表的检测模式

    private m_stType: eScrollOpacityType;

    /**

     * 初始化节点

     * @param scrollView 滚动列表组件

     * @param childParent 如果不选择滚动列表的content，则可自定义滚动列表内的某一节点为content

     * @param eType 子节点模式

     */

    public Init(scrollView: cc.ScrollView,childParent?: cc.Node,eType?: eScrollOpacityType)

    {

        this.m_stType = eType ? eType : eScrollOpacityType.ChildSize;

        this.m_stChildParent = childParent;

        this.m_stScrollView = scrollView;

        this.UpdateOpacity();

        scrollView.node.on("scrolling",this.OnScrolling,this);

        scrollView.node.on("scroll-began",this.OnScrollBegan,this);

        scrollView.node.on("scroll-ended",this.OnScrollEnded,this);

        scrollView.content.on(cc.Node.EventType.CHILD_REMOVED,this.OnChildRemove,this);

        scrollView.content.on(cc.Node.EventType.CHILD_REORDER,this.OnChildReOrder,this);

    }

    private OnScrolling(): void

    {

        this.m_bSafe = true;

        this.m_bIsScrolling = true;

        this.UpdateOpacity();

    }

    private OnScrollBegan(): void

    {

        this.m_bSafe = true;

        this.m_bIsScrolling = true;

        this.UpdateOpacity();

    }

    private OnScrollEnded(): void

    {

        this.m_bSafe = false;

        this.m_bIsScrolling = false;

        this.UpdateOpacity();

    }

    private OnChildRemove(): void

    {

        this.m_bSafe = false;

        this.UpdateOpacity();

    }

    private OnChildReOrder(): void

    {

        this.m_bSafe = false;

        this.UpdateOpacity();

    }

    //滑动的时候非精准隐藏

    //非滑动状态下精准隐藏

    /* ***************自定义事件*************** */

    private UpdateOpacity(): void

    {

        if(!this.m_stScrollView)

        {

            return;

        }

        let rect1_o = this.GetBoundBoxToWorld(this.m_stScrollView.content.parent,false);

        //滚动的时候将范围放大有利于展示所有有利信息

        if(this.m_bIsScrolling || this.m_bSafe)

        {

            rect1_o.width += rect1_o.width * 0.5;

            rect1_o.height += rect1_o.height * 0.5;

            rect1_o.x -= rect1_o.width * 0.25;

            rect1_o.y -= rect1_o.height * 0.25;

        }

        let parent: cc.Node = this.m_stChildParent ? this.m_stChildParent : this.m_stScrollView.content;

        parent.children.forEach(v1_o =>

        {

            v1_o.opacity = this.CheckCollision(rect1_o,v1_o) ? 255 : 0;

        });

    }

    /* ***************功能函数*************** */

    /**获取在世界坐标系下的节点包围盒(不包含自身激活的子节点范围) */

    private GetBoundBoxToWorld(node_o_: any,bScrollList: boolean): cc.Rect

    {

        let w_n: number = node_o_._contentSize.width;

        let h_n: number = node_o_._contentSize.height;

        let rect_o: cc.Rect;

        //为什么scrollList固定0.5，创建的时候是以中心点为起始点，大小为原始大小，导致会往左上偏移

        if(bScrollList)

        {

            rect_o = cc.rect(

                -0.5 * w_n,

                -0.5 * h_n,

                w_n,

                h_n

            );

        }

        else

        {

            rect_o = cc.rect(

                -node_o_._anchorPoint.x * w_n,

                -node_o_._anchorPoint.y * h_n,

                w_n,

                h_n

            );

        }

        node_o_._calculWorldMatrix();

        rect_o.transformMat4(rect_o,node_o_._worldMatrix);

        return rect_o;

    }

    /**获取在世界坐标系下的节点包围盒(包含自身激活的子节点范围) */

    private GetBoundBoxToWorld2(node_o_: cc.Node): cc.Rect

    {

        return node_o_.getBoundingBoxToWorld();

    }

    /**检测碰撞 */

    private CheckCollision(rect1_o: cc.Rect,node_o_: cc.Node): boolean

    {

        let rect2_o: cc.Rect;

        switch(this.m_stType)

        {

            case eScrollOpacityType.BoundBox:

                rect2_o = this.GetBoundBoxToWorld2(node_o_);

                break;

            case eScrollOpacityType.ChildSize:

                rect2_o = this.GetBoundBoxToWorld(node_o_,false)

                break;

            case eScrollOpacityType.ScrollList:

                rect2_o = this.GetBoundBoxToWorld(node_o_,true)

                break;

        }

        return rect1_o.intersects(rect2_o);

    }

    public Destory(): void

    {

        let scrollView = this.m_stScrollView;

        if(scrollView)

        {

            scrollView.node.on("scrolling",this.OnScrolling,this);

            scrollView.node.on("scroll-began",this.OnScrollBegan,this);

            scrollView.node.on("scroll-ended",this.OnScrollEnded,this);

            scrollView.content.on(cc.Node.EventType.CHILD_REMOVED,this.OnChildRemove,this);

            scrollView.content.on(cc.Node.EventType.CHILD_REORDER,this.OnChildReOrder,this);

        }

    }

}

export enum eScrollOpacityType

{

    ScrollList = 1,//该列表是虚拟循环列表(项目设计的时候有一点问题，大家可以忽略)

    ChildSize,//正常子节点

    BoundBox//当列表的子节点异常，只能计算包围盒

}