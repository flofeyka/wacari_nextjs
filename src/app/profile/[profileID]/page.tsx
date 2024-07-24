import ProfileDetailPage from "@/pagesComponents/profilePage/ProfilePage";

const ProfileDetail = ({params}: {params:{profileID: string}}) => {


    return (
        <div>
            <ProfileDetailPage profileID={params.profileID}/>
        </div>
    )
}

export default ProfileDetail;