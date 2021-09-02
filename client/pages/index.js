import FeaturedPosts from "../components/FeaturedPosts";
import AllTopics from "../components/Main/AllTopics";

export default function Home() {
  return (
    <div className="min-h-screen">
      <FeaturedPosts />
      <AllTopics />
    </div>
  );
}
