import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Type
} from "@angular/core";
import {
  ActivatedRoute,
  Router,
  RoutesRecognized,
  Route
} from "@angular/router";
import { RouterMapping } from "./app.route.map";

@Component({
  selector: "jhi-my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  public tabs: Tab[] = [];
  public routes: Route[] = [];
  public currentHoverTabKey?: string;
  private routerMapping : RouterMapping;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {
    // listen to routing change event to attach new tabs or activate a new one
    router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        this.checkAndAddRouteTab(val);
      }
    });
    this.routerMapping = new RouterMapping();
  }

  ngOnInit():void {
    // get all routes to mock a navigation
    this.routes = this.router.config;
  }

  disposeTab(tab: Tab):void {
    if (this.tabs.length > 1) {
      this.tabs = this.tabs.filter(item => item.key !== tab.key);

      if (tab.active) {
        // deactivate all tabs
        this.deactivateTabs();
        const url : string = this.tabs[this.tabs.length - 1].route?.path ?? "";
        this.router.navigateByUrl(url);
      }
    }
  }

  mouseOverTab(tab?: Tab):void {
    this.currentHoverTabKey = tab?.key;
  }

  tabDisplayName(tabName? : string): string{
    return this.routerMapping.displayName(tabName);
  }
   
  checkAndAddRouteTab(val: RoutesRecognized):void {
    // get the component to activate by the route
    const comp = val.state.root.firstChild?.component;
    
    const componentName: string = (comp instanceof Type) ? comp.name : (comp ?? "");
    
    // deactivate all tabs
    this.deactivateTabs();

    // check if the tab to be activated is already existing
    if (this.tabs.find(tab => tab.name === componentName) == null) {

      // if not, push it into the tab array
      if(val.state.root.firstChild?.routeConfig != null){
        this.tabs.push({
          name: componentName,
          component: comp,
          key: componentName,
          active: true,
          route: val.state.root.firstChild.routeConfig
        });
      }
    } else {
      // if the tab exists, activate it
      const tabToActivate = this.tabs.find(tab => tab.name === componentName);
      if (tabToActivate) {
        tabToActivate.active = true;
      }
    }

    this.changeDetector.markForCheck();
  }

  deactivateTabs() : void{
    this.tabs.forEach(tab => (tab.active = false));
  }
}

export interface Tab {
  name: string;
  component: any;
  active: boolean;
  route?: Route;
  key: string;
}
