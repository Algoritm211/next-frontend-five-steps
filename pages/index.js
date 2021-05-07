import MainPage from "../components/MainPage/MainPage";
import {useDispatch} from "react-redux";
import MainLayout from "../components/MainLayout/MainLayout";
import CustomHead from "../components/CustomHead/CustomHead";

export default function Home() {
  const dispatch = useDispatch()

  return (
    <MainLayout>
      <CustomHead
        title={'Welcome to Five-Steps'}
        keywords={['курсы', 'обучение', 'образование', 'навыки', '5 шагов', 'научиться', 'платформа', 'five steps',]}
        description={'Именно тут вы можете найти крутые курсы для нахождения новой профессии и приобретения новых навыков'}
      />
      <MainPage/>
    </MainLayout>
  )
}
