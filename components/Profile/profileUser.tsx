import { FC } from "react";
import Logout from "../../script/logout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useI18n } from "../../locales/client";

interface ProfileUserProps {
  name: string;
  lastName: string;
}

const ProfileUser: FC<ProfileUserProps> = ({ name, lastName }) => {
  const router = useRouter();
  const t = useI18n()

  const handleLogOut = () => {
    Logout().then(() => router.push("/login"));
  };

  return (
    <div className="profile-user">
      <Image src="https://picsum.photos/450/450" alt="profile" width={100} height={100}/>
      <p>{name} {lastName}</p>
      <button onClick={handleLogOut}>{t('profile.logOut')}</button> 
    </div>
  );
};

export default ProfileUser;
