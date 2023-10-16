import CalculatorsComponent from "@/components/CalculatorsComponent"
import CaloriesChartComponent from "@/components/CaloriesChartComponent"
import ProfileInfosComponent from "@/components/ProfileInfosComponent"


const UserProfilePage = () => {
  return(
    <div>
    <CaloriesChartComponent />
    <CalculatorsComponent />
    <ProfileInfosComponent />
    </div>
  )   
}

export default UserProfilePage