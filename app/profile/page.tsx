import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import ProfileClient from "./ProfileClient";

const ProfilePage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    return ( 
        <ClientOnly>
            <ProfileClient 
                user = {currentUser}
            />
        </ClientOnly>
    );
}
 
export default ProfilePage;