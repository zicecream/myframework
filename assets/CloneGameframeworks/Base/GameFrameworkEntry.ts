import { GameFrameworkLinkedList } from "./GameFrameworkLinkedList";
import { GameFrameworkModule } from "./GameFrameworkModule";
export class GameFrameworkEntry {
    private static s_GameFrameworkMoudles:GameFrameworkLinkedList<GameFrameworkModule>  = new GameFrameworkLinkedList<GameFrameworkModule>();
    public Update(elapseSeconds:number,realElapseSeconds:number){
        
    }
}