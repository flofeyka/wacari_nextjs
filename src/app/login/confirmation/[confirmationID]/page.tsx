import PasswordResetPage from "@/pagesComponents/passwordResetPage/PasswordResetPage";
import ConfirmRegistrationPage from "@/pagesComponents/confirmRegistrationPage/confirmRegistrationPage";

const PasswordReset = ({params}: {params:{confirmationID: string}}) => {


    return (
        <div>
            <ConfirmRegistrationPage confirmID={params.confirmationID}/>
        </div>
    )
}

export default PasswordReset;