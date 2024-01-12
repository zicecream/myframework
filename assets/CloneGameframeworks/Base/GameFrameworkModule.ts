export abstract class GameFrameworkModule{
    //模块优先级
    //优先级高的模块会优先执行，关闭操作后会进行
    abstract Priority:number;
        /// 游戏框架模块轮询。
        /// <param name="elapseSeconds">逻辑流逝时间，以秒为单位。</param>
        /// <param name="realElapseSeconds">真实流逝时间，以秒为单位。</param>
    abstract Update(elapseSeconds:number,realElapseSeconds:number):void;
}