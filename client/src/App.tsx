import "./App.css";
import { Button } from "@/components/ui/button.tsx";
import { Posts } from "@/pages/Posts.tsx";

function App() {
  return (
    <>
      <div>
        <Posts />
        <Button variant={"outline"} className="bg-blue-300 mt-5">
          Show more
        </Button>
      </div>
    </>
  );
}

export default App;
