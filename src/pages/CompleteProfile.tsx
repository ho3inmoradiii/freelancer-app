import { CompleteProfileForm } from "@/features/user/components/CompleteProfileForm.tsx";
import { useNavigate } from "react-router-dom";

export const CompleteProfile = () => {
    const navigate = useNavigate();
    const handleCompleteSuccess = () => {
        navigate('/dashboard')
    }

    return (
        <CompleteProfileForm onCompleteSuccess={ handleCompleteSuccess } />
    )
}
