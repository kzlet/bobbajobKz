import { Component } from '@angular/core';
import { ProvdashboardPage } from '../provdashboard/provdashboard';
import { LaundrySamedayPage } from '../laundry-sameday/laundry-sameday';
import { ProvsettingsPage } from '../provsettings/provsettings';
import { ProviderConnectionsPage } from '../provider-connections/provider-connections';
import { ProvprofilePage } from '../provprofile/provprofile';
import { JobHistoryPage } from '../job-history/job-history';

@Component({
  selector: 'page-providertab',
  templateUrl: 'providertab.html',
})
export class ProvidertabPage {
  
  tab1Root = ProvprofilePage;
  tab2Root = ProviderConnectionsPage;
  tab3Root = LaundrySamedayPage;
  tab4Root = JobHistoryPage;
  tab5Root = ProvsettingsPage;

  constructor() {

  }
}
