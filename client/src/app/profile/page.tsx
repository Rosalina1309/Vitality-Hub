import CalculatorsComponent from "@/components/CalculatorsComponent"
import CaloriesChartComponent from "@/components/CaloriesChartComponent"
import PersonalLogComponent from "@/components/PersonalLogComponent"
import ProfileInfosComponent from "@/components/ProfileInfosComponent"


const UserProfilePage = () => {
  return(
    <div>
    <CaloriesChartComponent />
    <CalculatorsComponent />
    <ProfileInfosComponent />
    <PersonalLogComponent />
    </div>
  )   
}

export default UserProfilePage