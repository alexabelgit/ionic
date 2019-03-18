import { Component } from '@angular/core';

import { InsightsPage } from '../insights/insights';
import { PlansPage } from '../plans/plans';
import { AlertsPage } from '../alerts/alerts';
import { ActivatePage } from '../activate/activate';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AlertsPage;
  tab2Root = InsightsPage;
  tab3Root = PlansPage;
  tab4Root = ActivatePage;

  constructor() {

  }
}
