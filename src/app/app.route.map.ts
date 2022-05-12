import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationsComponent } from './applications/applications.component';
import { CommunicationComponent } from './communication/communication.component';
import { Route, Router } from '@angular/router';

const DASH_BOARD_ROUTE = { path: '', component: DashboardComponent, pathMatch: 'full' };
const APPLICATION_ROUTE = { path: 'application', component: ApplicationsComponent, };
const COMMUNICAITON_ROUTE = { path: 'Communication', component: CommunicationComponent };

export class RouterMapping{
    routerMap = new Map<string,RouterDetails>();
    constructor(){
        this.routerMap.set("DashboardComponent",new RouterDetails("Dashboard",DASH_BOARD_ROUTE));
        this.routerMap.set("ApplicationsComponent",new RouterDetails("Applications",APPLICATION_ROUTE));
        this.routerMap.set("CommunicationComponent",new RouterDetails("Communications",COMMUNICAITON_ROUTE));    
    }
   public  displayName(componentName? : string) : string{
       if(componentName === undefined) {return "";}
        return this.routerMap.get(componentName)?.displayName ?? "";
    }

}
export const ROUTES: Route[] = [
    DASH_BOARD_ROUTE,
    APPLICATION_ROUTE,
    COMMUNICAITON_ROUTE,
];

class RouterMap{
    componentName: string;
    routerDetails : RouterDetails;
    constructor(componentName : string, routerDetails: RouterDetails){
        this.componentName = componentName;
        this.routerDetails = routerDetails;
    }
}
class RouterDetails{
    displayName: string;
    route : Route;
    constructor(displayName: string, route: Route){
        this.displayName = displayName;
        this.route = route;
    }
}





