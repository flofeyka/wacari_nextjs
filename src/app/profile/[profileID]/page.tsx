import ProfileDetailPage from "@/pagesComponents/profilePage/ProfilePage";

const ProfileDetail = ({params}: {params:{profileID: string}}) => {


    return (
        <ProfileDetailPage profileID={params.profileID}/>
    )
}

export default ProfileDetail;