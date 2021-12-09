import NavBar from "../navbar/NavBar";
import Header from "./Header";
import RecentNews from "./RecentNews";
import { ToastContainer } from "react-toastify";
import CommentBox from "../news/Comments/CommentBox";
import test from "../../assets/2048.zip";
export default function Home() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Header />
      <RecentNews />
      <a className="m-5 p-5" href={test} download>
        Tải game
      </a>
    </>
  );
}
