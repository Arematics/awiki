import {MenuGroup} from '../../_model/menu.group';
import {FullEntry} from '../../_model/fullEntry';
import {KeycloakProfile} from 'keycloak-js';

export interface EntryCreatorData {
  group: MenuGroup;
  entry: FullEntry;
  userProfile: KeycloakProfile;
}
