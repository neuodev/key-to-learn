import FeaturedPosts from "../components/FeaturedPosts";
import AllTopics from "../components/Main/AllTopics";
import MainPageSearchForm from "../components/Main/MainPageSearchForm";
import AllPosts from "../components/Main/AllPosts";
export default function Home() {
  return (
    <div className="min-h-screen">
      <FeaturedPosts />
      <AllTopics />
      <MainPageSearchForm showFilter={false} />
      <AllPosts />
    </div>
  );
}
