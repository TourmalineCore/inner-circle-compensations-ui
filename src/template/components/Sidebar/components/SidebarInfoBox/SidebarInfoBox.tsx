import { ReactComponent as IconPersonalProfile } from '../../../../../assets/icons/icon-personal-profile.svg';
import { capitalize } from '../../../../../common/utils/capitalize';

export function SidebarInfoBox({
  name,
}: {
  name: string;
}) {
  return (
    <div className="sidebar-infobox">
      <div className="sidebar-infobox__image">
        <IconPersonalProfile />
      </div>
      <div className="sidebar-infobox__col" data-cy="sidebar-infobox">
        <div className="sidebar-infobox__name">{capitalize(name)}</div>
      </div>
    </div>
  );
}
