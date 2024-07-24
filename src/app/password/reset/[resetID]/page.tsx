import PasswordResetPage from "@/pagesComponents/passwordResetPage/PasswordResetPage";

const PasswordReset = ({params}: {params:{resetID: string}}) => {


    return (
        <div>
            <PasswordResetPage profileID={params.resetID}/>
        </div>
    )
}

export default PasswordReset;