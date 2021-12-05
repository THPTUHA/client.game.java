import NavBar from "../navbar/NavBar";
import Header from "./Header";
import RecentNews from "./RecentNews";
import { ToastContainer } from 'react-toastify'

export default function Home() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Header />
      <RecentNews />
    </>
  );
}
