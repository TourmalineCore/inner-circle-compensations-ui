import { ReactComponent as IconPersonalProfile } from '../../../../../assets/icons/icon-personal-profile.svg';

function SidebarInfoBox({
  name,
}: {
  name: string;
}) {
  let fullName = '';

  // TODO: it’s necessary, but if something breaks, fix it here
  if (name.substring(0, 3) === 'ank') {
    const firstName = name.charAt(0).toUpperCase();
    const lastName = name.substring(2);
    fullName = `${lastName.charAt(0).toUpperCase() + name.slice(3)} ${firstName}.`;
  } else {
    const firstName = name.charAt(0).toUpperCase();
    const lastName = name.substring(1);
    fullName = `${lastName.charAt(0).toUpperCase() + name.slice(2)} ${firstName}.`;
  }
  return (
    <div className="sidebar-infobox">
      <div className="sidebar-infobox__image">
        <IconPersonalProfile />
      </div>
      <div className="sidebar-infobox__col" data-cy="sidebar-infobox">
        <div className="sidebar-infobox__name">{fullName}</div>
      </div>
    </div>
  );
}

export default SidebarInfoBox;
